import { CLProvider } from "@/providers/captains-lounge-provider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function CaptainsLoungeLayout({ children }: Props) {
  return <CLProvider>{children}</CLProvider>;
}
