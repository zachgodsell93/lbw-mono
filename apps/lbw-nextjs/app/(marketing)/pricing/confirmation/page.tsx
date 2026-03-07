"use client";
import React from "react";
import PageFade from "@/components/shared/page-fade";
import NewAccountDetails from "@/components/pricing/new-account-details";
type Props = {};

export default function Confirmation({}: Props) {
  return (
    <PageFade>
      <main className="flex flex-col justify-center lg:flex-row gap-4 py-10 px-6 lg:px-40">
        <div className="flex flex-col justify-center w-full gap-y-4 lg:w-2/3">
          <NewAccountDetails />
        </div>
      </main>
    </PageFade>
  );
}
