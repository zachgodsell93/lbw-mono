"use client";
import React, { useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/providers/user-provider";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

type Props = {};

type Settings = {
  tbb4_bot: boolean;
  tbb4_stake_size: number;
  tbb4_take_profit: number;
  tbb4_stop_loss: number;
};

export default function AutomationSettings({}: Props) {
  const [settings, setSettings] = React.useState<Settings>({
    tbb4_bot: false,
    tbb4_stake_size: 0,
    tbb4_take_profit: 0,
    tbb4_stop_loss: 0,
  });
  const [bettingSystem, setBettingSystem] = React.useState<number>(0);
  const { user, updateUserSetting, updateUserBettingsystem } = useUser();
  const { toast } = useToast();
  useEffect(() => {
    if (user) {
      setSettings({
        tbb4_bot: user.tbb4_bot !== null ? user.tbb4_bot : false,
        tbb4_stake_size:
          user.tbb4_stake_size !== null ? user.tbb4_stake_size : 0,
        tbb4_take_profit:
          user.tbb4_take_profit !== null ? user.tbb4_take_profit : 0,
        tbb4_stop_loss: user.tbb4_stop_loss !== null ? user.tbb4_stop_loss : 0,
      });
      setBettingSystem(user.betting_system_id ? user.betting_system_id : 0);
    }
  }, [user]);
  return (
    <main className="flex  flex-col gap-4 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Automation Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <div className="grid w-full gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Bot Activated</CardTitle>
              <CardDescription>
                Turn betting automation on or off.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={settings.tbb4_bot === true ? "on" : "off"}
                className="w-[400px]"
                onValueChange={(e) => {
                  setSettings({
                    ...settings,
                    tbb4_bot: e === "on" ? true : false,
                  });
                  updateUserSetting({ tbb4_bot: e === "on" ? true : false });
                  if (e === "on") {
                    toast({
                      title: "Bot Activated",
                      description: `Bot has been turned ${
                        e === "on" ? "on" : "off"
                      }`,
                      variant: "success",
                    });
                  } else {
                    toast({
                      title: "Bot Deactivated",
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
            </CardContent>
            {/* <CardFooter className="border-t px-6 py-4">
              <Button disabled>Save</Button>
            </CardFooter> */}
          </Card>
          {user?.tbb4_package !== 2 && user?.tbb4_package !== 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Thoroughbred Betting System</CardTitle>
                <CardDescription>
                  Choose which model you want to use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label>Model</Label>
                    <Select
                      defaultValue={bettingSystem.toString()}
                      value={bettingSystem.toString()}
                      onValueChange={(e) => {
                        setBettingSystem(parseInt(e));
                        updateUserBettingsystem(parseInt(e));
                        toast({
                          title: "Model Updated",
                          description: `Betting Model has been updated`,
                          variant: "success",
                        });
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="2">LBW/Trend</SelectItem>
                          {/* <SelectItem value="1">Tommy</SelectItem> */}
                          {/* <SelectItem value="3">Volume and Rank</SelectItem> */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Staking Settings</CardTitle>
              <CardDescription>
                Update your stake, take profit and stop loss settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Unit Sizing</Label>
                  <Input
                    placeholder="Unit Size"
                    value={
                      settings.tbb4_stake_size ? settings.tbb4_stake_size : 0
                    }
                    onChange={(e) => {
                      setSettings({
                        ...settings,
                        tbb4_stake_size: parseInt(e.target.value),
                      });
                    }}
                    name="units"
                  />
                </div>
                <div>
                  <Label>Take Profit</Label>
                  <Input
                    placeholder="Take Profit"
                    value={
                      settings.tbb4_take_profit ? settings.tbb4_take_profit : 0
                    }
                    onChange={(e) => {
                      setSettings({
                        ...settings,
                        tbb4_take_profit: parseInt(e.target.value),
                      });
                    }}
                    name="tp"
                  />
                </div>
                <div>
                  <Label>Stop Loss</Label>
                  <Input
                    placeholder="Take Profit"
                    value={
                      settings.tbb4_stop_loss ? settings.tbb4_stop_loss : 0
                    }
                    onChange={(e) => {
                      setSettings({
                        ...settings,
                        tbb4_stop_loss: parseInt(e.target.value),
                      });
                    }}
                    name="sl"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button
                onClick={() => {
                  updateUserSetting({
                    tbb4_stake_size: settings.tbb4_stake_size,
                    tbb4_take_profit: settings.tbb4_take_profit,
                    tbb4_stop_loss: settings.tbb4_stop_loss,
                  });
                  toast({
                    title: "Settings Updated",
                    description: `Settings have been updated`,
                    variant: "success",
                  });
                }}
              >
                Save
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
