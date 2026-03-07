"use client";
import React from "react";
import Link from "next/link";
import {
  AreaChart,
  Atom,
  Circle,
  CircleAlert,
  CogIcon,
  DollarSign,
  DownloadCloudIcon,
  FileBadge,
  FileSliders,
  FileSpreadsheet,
  Home,
  LineChart,
  Settings2,
  TrendingDown,
  Users2,
} from "lucide-react";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useUser } from "../../providers/user-provider";
import { Button } from "../ui/button";
import { ModeToggle } from "./theme-toggle";
import { useTrend } from "../../providers/trend-provider";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type Props = {};

export default function Sidebar(props: Props) {
  // get the route in a client component nextjs
  const router = useRouter();
  const path = usePathname();
  const { user } = useUser();
  const { botSettings } = useTrend();
  const dashActive = () =>
    path === "/dashboard"
      ? "text-primary bg-primary/10"
      : "hover:bg-primary/10";
  const isActive = (pathh: string) => {
    return path.startsWith(pathh)
      ? "text-primary bg-primary/10"
      : "hover:bg-primary/10";
  };

  const logout = () => {
    supabase.auth.signOut();
    router.push("/");
  };

  const premiumPackages = [3, 4, 5];
  if (!user)
    return (
      <div className="fixed top-0 left-0 h-full w-[220px] bg-muted lg:w-[280px bg-muted/20 z-10 hidden border-r lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Image
                src={"/logos/horse.svg"}
                width={30}
                height={30}
                alt="Lay Back and Win"
              />
              <span className="">Lay Back and Win</span>
            </Link>
            {/* <Button
        variant="outline"
        size="icon"
        className="ml-auto h-8 w-8"
      >
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button> */}
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
              {/* <Link
                href="/dashboard/results"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isActive("/dashboard/results")
                )}
              >
                <DollarSign className="h-4 w-4" />
                Results
              </Link> */}
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
            </nav>
          </div>
        </div>
      </div>
    );
  return (
    <div className="fixed top-0 left-0 h-full w-0 lg:w-[280px] bg-muted/20 z-10 border-r hidden lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Image
              src={"/logos/horse.svg"}
              width={30}
              height={30}
              alt="Lay Back and Win"
            />
            <span className="">Lay Back and Win</span>
          </Link>
          {/* <Button
      variant="outline"
      size="icon"
      className="ml-auto h-8 w-8"
    >
      <Bell className="h-4 w-4" />
      <span className="sr-only">Toggle notifications</span>
    </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
            {/* <Link
              href="/dashboard/results"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive("/dashboard/results")
              )}
            >
              <DollarSign className="h-4 w-4" />
              Results
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
            {user.email === "simon@meredithit.com" && (
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
            )} */}
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
            {/* {premiumPackages.includes(user.tbb4_package || 0) && (
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
            )} */}
            {(user.admin || user.staff) && (
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
                  href="/dashboard/lay-only"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive("/dashboard/admin/lay-only")
                  )}
                >
                  <TrendingDown className="h-4 w-4" />
                  Lay Only{" "}
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
                {/* <Link
                  href="/dashboard/admin/backtest"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive("/dashboard/admin/backtest")
                  )}
                >
                  <CogIcon className="h-4 w-4" />
                  Back Testing{" "}
                </Link> */}
                {/* <Link
                  href="/dashboard/admin/trend/all-results"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive("/dashboard/admin/trend/all-results")
                  )}
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  All Results{" "}
                </Link> */}
              </>
            )}
            {user.admin && (
              <>
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
        </div>
        <div className="flex flex-col mt-auto gap-y-4 w-full pb-8 self-end px-2 lg:px-4">
          <Button className="w-full" onClick={logout}>
            Logout
          </Button>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </div>
  );
}
