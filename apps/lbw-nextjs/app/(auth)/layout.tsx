import { AuthProvider } from "@/providers/auth-provider";
import React from "react";

type Props = {
  children?: React.ReactNode;
  params?: any;
};

export default function layout({ children, params }: Props) {
  return <>{children}</>;
}
