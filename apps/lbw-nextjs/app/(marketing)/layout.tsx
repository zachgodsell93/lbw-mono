"use client";
import React, { Suspense } from "react";
import Navbar from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/footer";
type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  const items = [
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Our Results",
      href: "/our-results",
    },
    {
      title: "Docs & Guides",
      href: "/docs",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <Navbar items={items} scroll={true} />
      </Suspense>
      <main className="flex-1">{children}</main>
      <SiteFooter className="border-t" />
    </div>
  );
}
