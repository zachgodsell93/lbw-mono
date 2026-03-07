import { RecentOrdersTable } from "@/components/admin/users/recent-orders";
import PageFade from "@/components/shared/page-fade";
import React from "react";

type Props = {};

export default function RecentOrders({}: Props) {
  return (
    <PageFade>
      <RecentOrdersTable />
    </PageFade>
  );
}
