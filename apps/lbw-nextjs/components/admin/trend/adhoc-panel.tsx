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
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTrend } from "@/providers/trend-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};

export default function AdhocPanel({}: Props) {
  const { toast } = useToast();
  const { setBotSettings, botSettings, botStatusHandler, saveSettingsHandler } =
    useTrend();
  if (!botSettings) return null;
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bot Activated</CardTitle>
          <CardDescription>Turn betting automation on or off.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={botSettings?.active ? "on" : "off"}
            className="w-[400px]"
            onValueChange={(e) => {
              setBotSettings({
                ...botSettings,
                active: e === "on" ? true : false,
              });
              botStatusHandler(e === "on" ? true : false);
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
      </Card>
    </div>
  );
}
