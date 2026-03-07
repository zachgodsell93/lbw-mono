import React from "react";
import PageFade from "@/components/shared/page-fade";
import { AdminProvider } from "@/providers/admin-provider";
type Props = {
  children?: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <AdminProvider>
      <PageFade>
        <main className="flex flex-col items-start gap-4 min-w-full pt-10 px-4 lg:px-6">
          {children}
        </main>
      </PageFade>
    </AdminProvider>
  );
}

export default layout;
