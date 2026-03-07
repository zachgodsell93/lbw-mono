"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
type Props = {
  open: boolean;
  code: any;
  user: any;
  openHandler: (open: boolean) => void;
};

function BetfairCodeHandler({ open, code, user, openHandler }: Props) {
  const [success, setSuccess] = React.useState<boolean | null>(null);
  React.useEffect(() => {
    const handleCode = async (userCode: string) => {
      console.log("Handle code started");
      const authUrl = `/api/betfair-auth-exchange`;

      const data = {
        code: userCode,
        user_settings_id: user?.us_id,
      };

      const config = {
        url: authUrl,
        method: "post",
        crossdomain: true,
        data: data,
      };
      try {
        const response = await axios(config);

        if (response.status === 200) {
          console.log("Code handled successfully");
          setSuccess(true);
          return;
        }
      } catch (e) {
        console.log(e);
        setSuccess(false);
      }
    };
    if (user?.us_id && code) handleCode(code);
  }, [code, user?.us_id]);
  return (
    <Dialog open={open} onOpenChange={openHandler}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Betfair Linking Confirmation</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Success</h1>
            <p className="text-lg">
              Your Betfair account has been successfully linked
            </p>
          </div>

          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div> */}
        </div>
        <DialogFooter>
          <Button variant="default" onClick={() => openHandler(!open)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BetfairCodeHandler;
