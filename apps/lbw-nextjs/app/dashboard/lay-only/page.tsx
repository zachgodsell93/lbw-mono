import AdhocPanel from "@/components/admin/lay-only/adhoc-panel";
import FileUpload from "@/components/admin/lay-only/file-upload";
import SelectionsTable from "@/components/admin/lay-only/selections-table";
import SettingsPanel from "@/components/admin/lay-only/settings-panel";
import PageFade from "@/components/shared/page-fade";
import React from "react";

type Props = {};

function TrendSelections({}: Props) {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-x-4 w-full pt-10 px-4 lg:px-6">
        <div className="flex w-full lg:w-1/2">
          <SettingsPanel />
        </div>
        <div className="flex w-full gap-y-4 flex-col lg:w-1/2">
          <AdhocPanel />
        </div>
      </div>
      <div className="flex w-full">
        <SelectionsTable />
      </div>
    </>
  );
}

export default TrendSelections;
