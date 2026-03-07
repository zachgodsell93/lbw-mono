import UsersTable from "@/components/admin/users/users-table";
import PageFade from "@/components/shared/page-fade";
import React from "react";

type Props = {};

export default function UserManagement({}: Props) {
  return (
    <PageFade>
      <UsersTable />
    </PageFade>
  );
}
