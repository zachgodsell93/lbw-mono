"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Router from "next/router";
type Props = {};
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useUser } from "../../providers/user-provider";

export default function UserMenu({}: Props) {
  const router = useRouter();
  const { user } = useUser();
  const logOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="">
          <CircleUser className="h-5 w-5" />
          <span className=" ml-2">{user?.first_name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/dashboard/settings/profile")}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/")}>
          Website
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
