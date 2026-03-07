"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Icons } from "../shared/icons";

// import { MainNavItem } from "types"
// import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ArrowRight, HamIcon, MenuIcon } from "lucide-react";
import { useUser } from "@/providers/user-provider";
import { Button } from "../ui/button";

interface MainNavProps {
  items?: any[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const { user } = useUser();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  React.useEffect(() => {
    const closeMobileMenuOnClickOutside = (event: MouseEvent) => {
      if (showMobileMenu) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("click", closeMobileMenuOnClickOutside);

    return () => {
      document.removeEventListener("click", closeMobileMenuOnClickOutside);
    };
  }, [showMobileMenu]);

  return (
    <div className="flex flex-row justify-between w-full gap-6 md:gap-10">
      <div className="hidden md:flex flex-row gap-6 md:gap-10">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Image
            src="/logos/horse.svg"
            width={30}
            height={30}
            alt="Lay Back and Win"
          />
          <span className="hidden font-urban text-xl font-bold sm:inline-block">
            Lay Back and Win
          </span>
        </Link>
        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                prefetch={true}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  item.href.startsWith(`/${segment}`)
                    ? "text-foreground"
                    : "text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
      <div className="md:flex-row gap-x-4 hidden md:flex">
        {!user ? (
          <>
            <Button onClick={() => router.push("/login")} className="self-end">
              Login
            </Button>
            <Button onClick={() => router.push("/pricing")} variant="outline">
              7 Day Free Trial
            </Button>
          </>
        ) : (
          <Button
            onClick={() => router.push("/dashboard")}
            className="self-end"
          >
            Dashboard <ArrowRight size={18} className="ml-2" />
          </Button>
        )}
      </div>
      <button
        className="flex items-center space-x-6 md:hidden"
        onClick={toggleMobileMenu}
      >
        {showMobileMenu ? <Icons.close /> : <MenuIcon />}
        {/* <span className="font-bold">Menu</span> */}
        <Image
          src="/logos/horse.svg"
          width={30}
          height={30}
          alt="Lay Back and Win"
        />
        <span className="font-urban text-xl font-bold">Lay Back and Win</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
