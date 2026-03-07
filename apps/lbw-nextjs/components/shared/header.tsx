"use client";
import React, { use } from "react";
import Link from "next/link";
import {
  AreaChart,
  Atom,
  CircleUser,
  DollarSign,
  DownloadCloudIcon,
  FileBadge,
  FileSpreadsheet,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Settings2,
  ShoppingCart,
  TrendingDown,
  Users,
  Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import BalanceButton from "./balance";
import UserMenu from "./user-menu";
import QuickSettings from "./quick-settings";
import ActiveToggle from "./active-toggle";
import { useUpcomingRaces } from "../../providers/upcoming-races-provider";
import CountdownText from "./countdown-text";
import { useUser } from "../../providers/user-provider";
import { useTrend } from "../../providers/trend-provider";
type Props = {};

export default function Header({}: Props) {
  const { upcomingRaces } = useUpcomingRaces();
  const path = usePathname();
  const { user } = useUser();
  const { botSettings } = useTrend();

  const premiumPackages = [3, 4, 5];

  const dashActive = () =>
    path === "/dashboard"
      ? "text-primary bg-primary/10"
      : "hover:bg-primary/10";
  const isActive = (pathh: string) => {
    return path.startsWith(pathh)
      ? "text-primary bg-primary/10"
      : "hover:bg-primary/10";
  };
  React.useEffect(() => {
    // console.log(upcomingRaces);
  }, [upcomingRaces]);
  return (
    <header className="flex fixed top-0 left-0 right-0 h-16 z-10 ml-[0px] lg:ml-[280px] bg-muted/20 items-center gap-4 border-b  px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium overflow-y-scroll">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 pb-6 text-lg font-semibold"
            >
              <Image
                src={"/logos/horse.svg"}
                width={30}
                height={30}
                alt="Lay Back and Win"
              />
              <span className="">Lay Back and Win</span>
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                dashActive()
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/results"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive("/dashboard/results")
              )}
            >
              <DollarSign className="h-4 w-4" />
              Results
              {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          6
        </Badge> */}
            </Link>
            <Link
              href="/dashboard/ratings/thoroughbred"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive("/dashboard/ratings/thoroughbred")
              )}
            >
              <AreaChart className="h-4 w-4" />
              Horse Ratings{" "}
            </Link>
            {user?.email === "simon@meredithit.com" && (
              <Link
                href="/dashboard/lay-only"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isActive("/dashboard/lay-only")
                )}
              >
                <TrendingDown className="h-4 w-4" />
                Lay Only{" "}
              </Link>
            )}
            <Link
              href="/dashboard/settings/profile"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive("/settings")
              )}
            >
              <Settings2 className="h-4 w-4" />
              Settings{" "}
            </Link>
            <Link
              href="/docs"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive("/docs")
              )}
            >
              <FileBadge className="h-4 w-4" />
              Docs & Guides
            </Link>
            {premiumPackages.includes(user?.tbb4_package || 0) && (
              <>
                <span className="px-3 pt-6 text-primary text-lg font-bold">
                  Beta Features
                </span>
                <Link
                  href="/dashboard/admin/models/tommy"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive("/dashboard/admin/models/tommy")
                  )}
                >
                  <LineChart className="h-4 w-4" />
                  Tommy
                </Link>
              </>
            )}
            {user?.admin && (
              <>
                <span className="px-3 pt-6 text-primary text-lg font-bold">
                  Members Selections
                </span>
                <Link
                  href="/dashboard/admin/trend/selections"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive("/dashboard/admin/trend/selections")
                  )}
                >
                  <div
                    className={cn(
                      "h-4 w-4 animate-pulse rounded-full",
                      botSettings?.active ? "bg-green-400" : "bg-red-400"
                    )}
                  />
                  Members Settings{" "}
                </Link>
                <Link
                  href="/dashboard/admin/trend/results"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive("/dashboard/admin/trend/results")
                  )}
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  Members Results{" "}
                </Link>
                <span className="px-3 pt-6 text-primary text-lg font-bold">
                  Admin
                </span>
                <Link
                  href="/dashboard/admin/user-management"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive("/dashboard/admin/user-management")
                  )}
                >
                  <Users2 className="h-4 w-4" />
                  User Management{" "}
                </Link>
                <Link
                  href="/dashboard/admin/recent-orders"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive("/dashboard/admin/recent-orders")
                  )}
                >
                  <DownloadCloudIcon className="h-4 w-4" />
                  Recent Orders{" "}
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="hidden max-lg:flex-1 max-lg:flex"></div>
      <div className="w-full flex gap-x-6 flex-row flex-1 max-lg:hidden overflow-x-scroll border-r-2 border-white no-scrollbar">
        {upcomingRaces &&
          upcomingRaces.map((race) => (
            <div
              key={race.selection_id}
              className="border-r flex-row flex gap-x-2"
            >
              <div>
                <span className="text-sm text-nowrap">
                  {race.venue} R{race.race_number}
                </span>
              </div>
              {race.market_start_time && (
                <CountdownText
                  boxClass="w-fit-content"
                  textClass="text-sm font-semibold text-nowrap"
                  jumpTime={race.market_start_time}
                />
              )}
            </div>
          ))}
      </div>
      {/* <div className="border-r-2"></div> */}
      <BalanceButton />
      <ActiveToggle />
      <QuickSettings />
      <UserMenu />
      {/* <ModeToggle /> */}
    </header>
  );
}
