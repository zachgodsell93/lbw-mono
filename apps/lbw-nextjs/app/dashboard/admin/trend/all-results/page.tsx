import AllResultsTable from "@/components/admin/trend/all-results-table";
import PageFade from "@/components/shared/page-fade";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <PageFade>
      <div className="flex flex-row w-full"></div>
      <div className="flex w-full">
        <AllResultsTable />
      </div>
    </PageFade>
  );
}
