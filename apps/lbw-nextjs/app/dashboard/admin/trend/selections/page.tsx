import AdhocPanel from "@/components/admin/trend/adhoc-panel";
import FileUpload from "@/components/admin/trend/file-upload";
import SelectionsTable from "@/components/admin/trend/selections-table";
import SettingsPanel from "@/components/admin/trend/settings-panel";
import PageFade from "@/components/shared/page-fade";
import React from "react";

type Props = {};

function TrendSelections({}: Props) {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-x-4 w-full">
        <div className="flex w-full lg:w-1/2">
          <SettingsPanel />
        </div>
        <div className="flex w-full gap-y-4 flex-col lg:w-1/2">
          <AdhocPanel />
          <FileUpload />
        </div>
      </div>
      <div className="flex w-full">
        <SelectionsTable />
      </div>
    </>
  );
}

export default TrendSelections;
