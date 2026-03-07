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
import { useTrend } from "@/providers/trend-provider";
import { CircleDollarSign, DollarSign } from "lucide-react";

type Props = {};

function SettingsPanel({}: Props) {
  const { botSettings, saveSettingsHandler, setBotSettings, botStatusHandler } =
    useTrend();
  if (!botSettings) return null;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Adjust all settings for the bot here</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row w-full gap-x-6 gap-y-6">
          <div className="flex flex-col gap-y-6 w-1/2">
            <div>
              <Label>Min Runners</Label>
              <Input
                placeholder="Min. Runners"
                value={botSettings?.min_runners || ""}
                onChange={(e) => {
                  setBotSettings({
                    ...botSettings,
                    min_runners: parseInt(e.target.value),
                  });
                }}
                type="number"
              />
            </div>

            <div>
              <Label>Min Odds</Label>
              <Input
                placeholder="Min. Odds"
                value={botSettings?.min_odds || ""}
                onChange={(e) => {
                  setBotSettings({
                    ...botSettings,
                    min_odds: parseFloat(e.target.value),
                  });
                }}
                type="number"
                step={0.1}
              />
            </div>
            <div>
              <Label>Max Back Price</Label>

              <Input
                placeholder="Max. Odds"
                value={botSettings?.max_back_price || ""}
                onChange={(e) => {
                  setBotSettings({
                    ...botSettings,
                    max_back_price: parseFloat(e.target.value),
                  });
                }}
                type="number"
                step={0.1}
              />
            </div>
            <div>
              <Label>Max Lay BF</Label>

              <Input
                placeholder="Max. Odds"
                value={botSettings?.max_odds_lay || ""}
                onChange={(e) => {
                  setBotSettings({
                    ...botSettings,
                    max_odds_lay: parseFloat(e.target.value),
                  });
                }}
                type="number"
                step={0.1}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-6  w-1/2">
            <div>
              <Label>Take Profit (Units)</Label>
              <Input
                placeholder="Take Profit"
                value={botSettings?.take_profit || ""}
                onChange={(e) => {
                  setBotSettings({
                    ...botSettings,
                    take_profit: parseInt(e.target.value),
                  });
                }}
                type="number"
              />
            </div>
            <div>
              <Label>Stop Loss (Units)</Label>
              <Input
                placeholder="Stop Loss"
                value={botSettings?.stop_loss || ""}
                onChange={(e) => {
                  setBotSettings({
                    ...botSettings,
                    stop_loss: parseInt(e.target.value),
                  });
                }}
                type="number"
              />
            </div>
            <div>
              <Label>Lay To Price</Label>
              <Input
                placeholder="Lay To Price"
                value={botSettings?.lay_to_price || ""}
                onChange={(e) => {
                  setBotSettings({
                    ...botSettings,
                    lay_to_price: parseInt(e.target.value),
                  });
                }}
                type="number"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 justify-end">
        <Button onClick={saveSettingsHandler}>Save</Button>
      </CardFooter>
    </Card>
  );
}

export default SettingsPanel;
