"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
// import { MainNavItem } from "types"
// import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils";
// import { useLockBody } from "@/hooks/use-lock-body"
import { Icons } from "@/components/shared/icons";
import { useUser } from "@/providers/user-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

interface MobileNavProps {
  items: any[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  //   useLockBody()
  const { user } = useUser();
  const router = useRouter();
  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto overflow-y-scroll p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-2 text-popover-foreground  shadow-md">
        {/* <Link href="/" className="flex items-center space-x-2">
          
          <Image
            src="/logos/horse.svg"
            width={30}
            height={30}
            alt="Lay Back and Win"
          />
          <span className="font-bold">Lay Back & Win</span>
        </Link> */}
        <nav className="grid grid-flow-row auto-rows-max text-sm border-2 p-4 rounded-lg">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center text-white rounded-md p-2 py-4 text-sm font-medium hover:underline ",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
          <div className="flex flex-col gap-y-4 pt-6">
            {user && (
              <Button onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
            )}
            {user && <Button variant="outline">Log Out</Button>}
            {!user && (
              <Button onClick={() => router.push("/login")}>Log In</Button>
            )}
            {!user && (
              <Button onClick={() => router.push("/pricing")} variant="outline">
                7 Day Free Trial
              </Button>
            )}
          </div>
        </nav>
        {children}
      </div>
    </div>
  );
}
