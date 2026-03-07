import RacesTable from "@/components/admin/back-testing/races-table";
import SettingsPanel from "@/components/admin/back-testing/settings-panel";
import Summary from "@/components/admin/back-testing/summary";
import { BacktestingProvider } from "@/providers/backtesting-provider";
import React from "react";

type Props = {};

export default function BackTesting({}: Props) {
  return (
    <BacktestingProvider>
      <div className="flex flex-col-reverse lg:flex-row gap-x-4 w-full">
        <div className="flex w-full">
          <SettingsPanel />
        </div>
      </div>
      <div className="flex w-full">
        <Summary />
      </div>
      <div className="flex w-full">
        <RacesTable />
      </div>
    </BacktestingProvider>
  );
}
