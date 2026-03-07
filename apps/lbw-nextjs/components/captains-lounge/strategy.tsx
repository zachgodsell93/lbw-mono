"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";
import {
  Strategies,
  useCaptainsLounge,
} from "@/providers/captains-lounge-provider";
import { set } from "date-fns";
import { useToast } from "../ui/use-toast";

type Props = {
  raceCode: "Thoroughbred" | "Greyhound" | "Harness";
};

export default function Strategy({ raceCode }: Props) {
  const [botSettings, setBotSettings] = React.useState<Strategies | null>(null);
  const { filterStrategy, updateStrategy } = useCaptainsLounge();
  const { toast } = useToast();

  React.useEffect(() => {
    console.log("raceCode", raceCode);
    const strat = filterStrategy({ type: raceCode });
    strat?.days_of_week?.split(",").map((day) => {
      return day.toString();
    });
    setBotSettings(strat);

    setBotSettings(strat);
  }, [raceCode]);

  if (!botSettings) return null;
  return (
    <motion.div
      className="w-full"
      key={raceCode}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Active Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row w-full gap-x-6 gap-y-6">
            <div className="flex flex-row gap-x-6 w-full">
              <div className="w-1/3">
                <Tabs
                  value={botSettings.active === true ? "on" : "off"}
                  defaultValue={botSettings.active === true ? "on" : "off"}
                  className="w-[400px]"
                  onValueChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      active: e === "on" ? true : false,
                    });
                    updateStrategy(
                      { type: raceCode },
                      { active: e === "on" ? true : false }
                    );
                    if (e === "on") {
                      toast({
                        title: `${raceCode} Bot Activated`,
                        description: `Bot has been turned ${
                          e === "on" ? "on" : "off"
                        }`,
                        variant: "success",
                      });
                    } else {
                      toast({
                        title: `${raceCode} Bot Deactivated`,
                        description: `Bot has been turned ${
                          e === "on" ? "on" : "off"
                        }`,
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  <TabsList>
                    <TabsTrigger
                      value="on"
                      className=" data-[state=active]:bg-green-600/80"
                    >
                      On
                    </TabsTrigger>
                    <TabsTrigger
                      value="off"
                      className="data-[state=active]:bg-red-600/80"
                    >
                      Off
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardHeader>
          <CardTitle>{raceCode} Settings</CardTitle>
          <CardDescription>
            Adust all settings for your trend strategy here
          </CardDescription>
        </CardHeader>
        <CardHeader>
          <CardTitle className="text-xl">Staking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full gap-x-6 gap-y-6">
            <div className="flex flex-row gap-x-6 w-full">
              <div className="w-1/3">
                <Label>Stake Sizing</Label>
                <Input
                  placeholder="Min. Runners"
                  value={botSettings?.stake || ""}
                  onChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      stake: parseFloat(e.target.value),
                    });
                  }}
                  type="number"
                />
              </div>

              <div className="w-1/3">
                <Label>Take Profit</Label>
                <Input
                  placeholder="Min. Odds"
                  value={botSettings?.take_profit || ""}
                  onChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      take_profit: parseFloat(e.target.value),
                    });
                  }}
                  type="number"
                />
              </div>
              <div className="w-1/3">
                <Label>Stop Loss</Label>
                <Input
                  placeholder="Stop Loss"
                  value={botSettings?.stop_loss || ""}
                  onChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      stop_loss: parseFloat(e.target.value),
                    });
                  }}
                  type="number"
                />
              </div>
            </div>
            <div className="flex flex-row gap-x-6 w-full">
              <div className="w-1/3">
                <Label>Min Odds</Label>
                <Input
                  placeholder="Min. Runners"
                  value={botSettings?.minimum_odds.toFixed(2)}
                  onChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      minimum_odds: parseFloat(e.target.value),
                    });
                  }}
                  type="number"
                  step="0.01"
                />
              </div>

              <div className="w-1/3">
                <Label>Max Odds</Label>
                <Input
                  placeholder="Min. Odds"
                  onChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      maximum_odds: parseFloat(e.target.value),
                    });
                  }}
                  value={botSettings?.maximum_odds.toFixed(2)}
                  type="number"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardHeader>
          <CardTitle className="text-xl">Volume Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full gap-x-6 gap-y-6">
            <div className="flex flex-row gap-x-6 w-full">
              <div className="w-1/3">
                <Label>Rank</Label>
                <Tabs
                  defaultValue={botSettings?.rank.toString()}
                  onValueChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      rank: parseInt(e),
                    });
                  }}
                  className=""
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger
                      className=" data-[state=active]:bg-blue-400"
                      value="1"
                    >
                      1
                    </TabsTrigger>
                    <TabsTrigger
                      className=" data-[state=active]:bg-blue-400"
                      value="2"
                    >
                      2
                    </TabsTrigger>
                    <TabsTrigger
                      className=" data-[state=active]:bg-blue-400"
                      value="3"
                    >
                      3
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="w-1/3">
                <Label>Percent</Label>
                <Input
                  placeholder="Min. Odds"
                  value={botSettings?.percent || 0}
                  onChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      percent: parseFloat(e.target.value),
                    });
                  }}
                  type="number"
                />
              </div>
              <div className="w-1/3">
                <Label>Min Volume</Label>
                <Input
                  placeholder="Max. Odds"
                  value={botSettings?.minimum_volume || 0}
                  onChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      minimum_volume: parseInt(e.target.value),
                    });
                  }}
                  type="number"
                />
              </div>
            </div>
            <div className="flex flex-row gap-x-6 w-full">
              <div className="w-1/3">
                <Label>Min Runners</Label>
                <Input
                  placeholder="Min. Runners"
                  value={botSettings?.minimum_runners || 7}
                  onChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      minimum_runners: parseInt(e.target.value),
                    });
                  }}
                  type="number"
                />
              </div>

              <div className="w-1/3">
                <Label>Percent</Label>
                <Input
                  placeholder="Percent"
                  value={botSettings?.percent || ""}
                  onChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      percent: parseFloat(e.target.value),
                    });
                  }}
                  type="number"
                />
              </div>
              <div className="w-1/3">
                <Label>Back or Lay Only</Label>
                <Select
                  defaultValue={botSettings?.bet_side}
                  onValueChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      bet_side: e,
                    });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Back, Lay or Both" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Back">Back</SelectItem>
                      <SelectItem value="Lay">Lay</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardHeader>
          <CardTitle className="text-xl">Scheduling Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full gap-x-6 gap-y-6">
            <div className="flex flex-row gap-x-6 w-full">
              <div className="w-1/3">
                <Label>Days of Week</Label>
                <ToggleGroup
                  type="multiple"
                  className="w-full flex-wrap justify-between"
                  defaultValue={botSettings?.days_of_week?.split(",") || []}
                  onValueChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      days_of_week: e.join(","),
                    });
                  }}
                >
                  <ToggleGroupItem
                    className=" data-[state=on]:bg-blue-400"
                    value="1"
                  >
                    Mon
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className=" data-[state=on]:bg-blue-400"
                    value="2"
                  >
                    Tues
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className=" data-[state=on]:bg-blue-400"
                    value="3"
                  >
                    Wed
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className=" data-[state=on]:bg-blue-400"
                    value="4"
                  >
                    Thur
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className=" data-[state=on]:bg-blue-400"
                    value="5"
                  >
                    Fri
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className=" data-[state=on]:bg-blue-400"
                    value="6"
                  >
                    Sat
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className=" data-[state=on]:bg-blue-400"
                    value="7"
                  >
                    Sun
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="w-1/3">
                <Label>Start Time</Label>
                <Input
                  placeholder="Min. Odds"
                  value={botSettings?.start_time || ""}
                  onChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      start_time: e.target.value,
                    });
                  }}
                  type="time"
                />
              </div>
              <div className="w-1/3">
                <Label>End Time</Label>
                <Input
                  placeholder="Max. Odds"
                  value={botSettings?.end_time || ""}
                  onChange={(e) => {
                    setBotSettings({
                      ...botSettings,
                      end_time: e.target.value,
                    });
                  }}
                  type="time"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button
            onClick={() => {
              updateStrategy({ type: raceCode }, botSettings);
              toast({
                title: `${raceCode} Strategy Updated`,
                description: `Strategy has been updated`,
                variant: "success",
              });
            }}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
