"use client";
import React from "react";
import Papa from "papaparse";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase.types";
import { supabase } from "@/utils/supabase/client";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { error } from "console";

type Props = {};

type SelectionOverride =
  Database["public"]["Tables"]["starter_package_selection_overrides"]["Insert"];
type UpcomingRacesSheet =
  Database["public"]["Views"]["upcoming_races_sheet"]["Row"];

interface Selection {
  DATE: string;
  TRACK: string;
  RN: string;
  TN: string;
  HORSE: string;
  MPRANK: number;
  LBW: number;
  RDRANK: number;
}

type SheetUpload = Database["public"]["Tables"]["mp_prices_upload"]["Insert"];

interface OverrideData extends SelectionOverride {
  race: string;
}

export default function FileUpload({}: Props) {
  const [initialData, setInitialData] = React.useState<OverrideData[] | null>(
    null
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const processSelections = async (selections: Selection[]) => {
    // Process selections here
    const todaysSelections = await getTodaysSelections();
    if (!todaysSelections) {
      return;
    }
    const mapSelections = selections.map((selection: Selection) => {
      const horseName = selection.HORSE.toLowerCase()
        .replace(/ /g, "")
        .replace(/'/g, "");
      const todaysSelection = todaysSelections.find((s: UpcomingRacesSheet) => {
        const todaysHorseName = s.horse
          ?.toLowerCase()
          .replace(/ /g, "")
          .replace(/'/g, "");
        if (
          todaysHorseName === horseName &&
          s.hn === selection.TN &&
          s.rn === selection.RN
        ) {
          return {
            selection_id: s.selection_id,
            market_id: s.market_id,
            side: "NO BET",
            lbw_price: selection.LBW,
            units: 1,
            selection_name: `${s.hn}. ${s.horse}`,
            race: `${s.venue} - R${s.rn}`,
          };
        }
      });
      return {
        selection_id: todaysSelection?.selection_id,
        market_id: todaysSelection?.market_id,
        side: "NO BET",
        lbw_price: selection.LBW,
        units: 1,
        mprank: selection.MPRANK,
        selection_name: `${todaysSelection?.hn}. ${todaysSelection?.horse}`,
        race: `${todaysSelection?.venue} - R${todaysSelection?.rn}`,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
    });
    console.log("mapSelections", mapSelections);
    const filteredSelections = mapSelections.filter(
      (selection) => selection.selection_id !== undefined
    );
    setInitialData(filteredSelections);
    setModalOpen(true);
    console.log(filteredSelections);
  };

  const getTodaysSelections = async () => {
    const { data, error } = await supabase
      .from("upcoming_races_sheet")
      .select("*")
      .eq("event_date", moment().format("YYYY-MM-DD"));

    if (error) {
      console.error(error);
      return;
    }
    console.log(data);

    return data;
  };

  const excludedTracks = async () => {
    const { data, error } = await supabase
      .from("mp_tracks_excluded")
      .select("track")
      .lte("result", -5.5)
      .eq("mprank", 1);
    if (error) {
      console.error(error);
      return;
    }
    return data.map((item: any) => item.track.trim());
  };

  const handleFileUpload = async (event: any) => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) return;

    // Check if file is CSV
    if (!file.name.endsWith(".csv")) {
      alert("Please upload a CSV file only");
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the input
      }
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: async (result: any) => {
        // remove any whitespace in the headings
        const data = result.data.map((item: any) => {
          const newItem: { [key: string]: any } = {};
          for (const key in item) {
            console.log(key);
            newItem[key.trim()] = item[key].trim();
          }
          return newItem;
        });

        const sheetUpload = await data.map((item: any) => {
          const newItem: SheetUpload = {
            date: moment(item.DATE, "DD/M/YYYY").format("YYYY-MM-DD"),
            track: item.TRACK,
            rn: parseInt(item.RN),
            tn: parseInt(item.TN),
            horse: item.HORSE,
            mprank: parseInt(item.MPRANK),
            mpdiv2: parseFloat(item.LBW),
            rjump: item.rJUMP,
            rdrank: parseInt(item.RDRANK),
          };
          return newItem;
        });

        // remove any items from sheetUpload where mpdiv2 is greater than 100

        const filteredData = sheetUpload.filter(
          (item: SheetUpload) => item.horse
        );

        console.log(filteredData);

        await supabase.from("mp_prices_upload").insert(filteredData);
        const excluded = await excludedTracks();
        if (!excluded) {
          return;
        }
        const venueRemoved = data.filter((item: any) => {
          return !excluded.includes(item.TRACK) && item.MPDIV2 <= 100;
        });
        // return only keys in Selection type
        const selections = data.map((item: any) => {
          const newItem: Selection = {
            DATE: item.DATE,
            TRACK: item.TRACK,
            RN: item.RN,
            TN: item.TN,
            HORSE: item.HORSE,
            MPRANK: parseInt(item.MPRANK),
            RDRANK: parseInt(item.RDRANK),
            LBW: item.LBW,
          };
          return newItem;
        });

        console.log(selections);

        await processSelections(selections);
        //   setJsonData(result.data);
      },
      skipEmptyLines: true,
    });
  };
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Upload Selections Sheet</CardTitle>
          <CardDescription>Data required: DATE, HORSE, TN, RN</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file">Upload File</Label>
            <Input ref={fileInputRef} id="file" type="file" />
            <Button onClick={handleFileUpload}>Upload</Button>
          </div>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="min-w-[800px]">
              <DialogHeader>
                <DialogTitle>Confirm your Selections</DialogTitle>
                <DialogDescription>Confirm the Selections</DialogDescription>
              </DialogHeader>
              <DataModal data={initialData || []} />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

const DataModal = ({ data }: { data: OverrideData[] }) => {
  const [uploadData, setUploadData] = React.useState<OverrideData[]>(data);
  const [loading, setLoading] = React.useState(false);

  const includeRaces = async () => {
    setLoading(true);
    const races = uploadData
      .map((race) => {
        return {
          market_id: race.market_id?.toString(),
          starter_package_include: true,
        };
      })
      .filter((value, index, self) => self.indexOf(value) === index);
    for (const race of races) {
      const { data, error } = await supabase
        .from("betfair_market_data")
        .update({ starter_package_include: true })
        .eq("market_id", race.market_id);
      if (error) {
        console.error(error);
      }
    }
  };

  const confirmSelections = async () => {
    setLoading(true);
    await includeRaces();
    console.log(uploadData);
    // drop race column from uploadData
    const upData = uploadData.map(({ ["race"]: _, ...rest }) => rest);
    const { data, error } = await supabase
      .from("starter_package_selection_overrides")
      .upsert(upData, { onConflict: "selection_id" });
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    // wait 2 seconds and reload the page
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-y-4 w-full max-h-[600px]  overflow-y-auto">
      <Button onClick={confirmSelections} disabled={loading}>
        Confirm Selections
      </Button>
      <Table className="">
        <TableHeader>
          <TableHead></TableHead>
          <TableHead>Race</TableHead>
          <TableHead>Selection Name</TableHead>
          <TableHead>LBW Price</TableHead>
        </TableHeader>
        <TableBody>
          {uploadData.map((item: OverrideData, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <Button
                  onClick={() => {
                    const updatedData = uploadData.filter(
                      (data, i) => i !== index
                    );
                    setUploadData(updatedData);
                  }}
                  variant="destructive"
                >
                  Remove
                </Button>
              </TableCell>
              <TableCell>{item.race}</TableCell>
              <TableCell>{item.selection_name}</TableCell>
              <TableCell>{item.lbw_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
