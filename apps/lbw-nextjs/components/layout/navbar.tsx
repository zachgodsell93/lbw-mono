"use client";
import React from "react";
import useScroll from "@/hooks/use-scroll";
import { useUser } from "@/providers/user-provider";
import { MainNav } from "./main-nav";

interface NavBarProps {
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
  items: { title: string; href: string }[];
}

export default function Navbar({
  children,
  rightElements,
  items,
  scroll = false,
}: NavBarProps) {
  const { user } = useUser();

  const scrolled = useScroll(50);

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-background/0") : "border-b"
      }`}
    >
      <div className="container flex h-[60px] flex-row max-sm:justify-between items-center justify-between py-4">
        <MainNav items={items}>{children}</MainNav>
      </div>
    </header>
  );
}
