import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SidebarNav } from "@/components/settings/sidebar";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import PageFade from "@/components/shared/page-fade";

type Props = {
  children?: React.ReactNode;
  params?: any;
};

export default function layout({ children, params }: Props) {
  const sidebarNavItems = [
    {
      title: "Profile",
      href: "/dashboard/settings/profile",
    },
    {
      title: "Automation Settings",
      href: "/dashboard/settings/automation-settings",
    },
    {
      title: "Billing & Subscription",
      href: "/dashboard/settings/billing",
    },
    {
      title: "Change Password",
      href: "/dashboard/settings/change-password",
    },

    {
      title: "Betfair Account",
      href: "/dashboard/settings/betfair-account",
    },
  ];
  return (
    <>
      <PageFade>
        <div className="space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </PageFade>
    </>
  );
}
