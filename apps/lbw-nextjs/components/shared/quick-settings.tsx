"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings } from "lucide-react";
import { useUser } from "../../providers/user-provider";

type Props = {};

type Settings = {
  tbb4_stake_size: number | null;
  tbb4_take_profit: number | null;
  tbb4_stop_loss: number | null;
};

export default function QuickSettings({}: Props) {
  const { user, updateUserSetting } = useUser();
  const [settings, setSettings] = React.useState<Settings>({
    tbb4_stake_size: 0,
    tbb4_take_profit: 0,
    tbb4_stop_loss: 0,
  });

  const saveSettings = async () => {
    if (!user) return;
    await updateUserSetting({
      tbb4_stake_size: settings.tbb4_stake_size,
      tbb4_take_profit: settings.tbb4_take_profit,
      tbb4_stop_loss: settings.tbb4_stop_loss,
    });
  };

  React.useEffect(() => {
    if (!user) return;
    setSettings({
      tbb4_stake_size: user.tbb4_stake_size,
      tbb4_take_profit: user.tbb4_take_profit,
      tbb4_stop_loss: user.tbb4_stop_loss,
    });
  }, [user]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Settings />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Change Quick Settings</SheetTitle>
          <SheetDescription>
            Make changes to your staking, unit sizing here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right col-span-2">
              Unit Sizing $
            </Label>
            <Input
              type="number"
              value={`${settings.tbb4_stake_size}`}
              onChange={(e) => {
                setSettings({
                  ...settings,
                  tbb4_stake_size: parseInt(e.target.value),
                });
              }}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right col-span-2">
              Take Profit $
            </Label>
            <Input
              type="number"
              onChange={(e) => {
                setSettings({
                  ...settings,
                  tbb4_take_profit: parseInt(e.target.value),
                });
              }}
              value={`${settings.tbb4_take_profit}`}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right col-span-2">
              Stop Loss $
            </Label>
            <Input
              type="number"
              onChange={(e) => {
                setSettings({
                  ...settings,
                  tbb4_stop_loss: parseInt(e.target.value),
                });
              }}
              value={`${settings.tbb4_stop_loss}`}
              className="col-span-2"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={saveSettings} type="submit">
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
