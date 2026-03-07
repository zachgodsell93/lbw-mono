"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter, File } from "lucide-react";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { useUser } from "../../providers/user-provider";
import moment from "moment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
type Props = {};

export default function ResultsTableControls({}: Props) {
  const [racesCodes, setRacesCodes] = React.useState<string[]>([]);
  const [venues, setVenues] = React.useState<string[]>([]);

  const { results, dates, handleResults } = useUser();

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = () => {
    const d = results?.results.map((item) => ({
      Date: moment(item.order_placed_time).format("ddd DD MMM"),
      time: moment(item.order_placed_time).format("hh:mm A"),
      Race: item.race_name,
      distance: item.market_name?.split(" ")[1],
      Selection: item.selection_name,
      Side: item.side,
      Percentage: item.percentage,
      Result: item.result,
      Profit: item.profit_with_comm,
      Stake: item.order_stake,
      Price: item.order_price,
    }));
    if (!d) return;
    const ws = XLSX.utils.json_to_sheet(d);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    const fileName = `LBW Results - ${moment(dates.from).format(
      "DD MMM YYYY"
    )} - ${moment(dates.to).format("DD MMM YYYY")} ${fileExtension}`;
    FileSaver.saveAs(data, fileName);
  };

  useEffect(() => {
    if (!results) return;
    const codes = Array.from(
      new Set(
        results.results?.map((result) => result.race_type?.toString() || "")
      )
    );
    setRacesCodes(codes);

    const venues = Array.from(
      new Set(results.results?.map((result) => result.venue?.toString() || ""))
    );
    setVenues(venues);
  }, [results]);
  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="flex items-center gap-2">
        <DatePickerWithPresets />
        <Button
          onClick={() => {
            handleResults(
              moment().format("YYYY-MM-DD"),
              moment().add(1, "day").format("YYYY-MM-DD")
            );
          }}
          size="sm"
          variant="outline"
          className="h-8 gap-1"
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Today
          </span>
        </Button>
        <Button
          onClick={exportToCSV}
          size="sm"
          variant="outline"
          className="h-8 gap-1"
        >
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={racesCodes.length === 0}
              variant="outline"
              size="sm"
              className="h-8 gap-1"
            >
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Race Code
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {racesCodes.map((code, index) => (
              <DropdownMenuCheckboxItem key={index}>
                {code}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Side
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem>Lay</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Back</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Venue
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {venues.map((venue, index) => (
              <DropdownMenuCheckboxItem key={index}>
                {venue}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
}

function DatePickerWithPresets() {
  const { handleResults, dates } = useUser();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: dates ? moment(dates.from).toDate() : moment().toDate(),
    to: dates ? moment(dates.to).toDate() : moment().add(1, "day").toDate(),
  });

  useEffect(() => {
    handleResults(
      moment(date?.from).format("YYYY-MM-DD"),
      moment(date?.to).format("YYYY-MM-DD")
    );
  }, [date]);

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
