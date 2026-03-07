import React from "react";
import PageFade from "@/components/shared/page-fade";
import { TommyProvider } from "@/providers/tommy-provider";
import TommyMetrics from "@/components/admin/models/tommy-metrics";
import TommyTable from "@/components/admin/models/tommy-table";
import TommyResults from "@/components/admin/models/tommy-upcoming";
import { DatePickerWithPresets } from "@/components/admin/models/date-picker";
type Props = {};

export default function Tommy({}: Props) {
  return (
    <PageFade>
      <TommyProvider>
        <main className="grid items-start gap-4 min-w-full pt-10 sm:px-6">
          <div className="flex items-center w-full">
            <DatePickerWithPresets />
          </div>
          <div className="flex items-center w-full">
            <TommyMetrics />
          </div>
          <div className="flex w-full">
            <TommyResults />
          </div>
          <div className="flex w-full">
            <TommyTable />
          </div>
        </main>
      </TommyProvider>
    </PageFade>
  );
}
