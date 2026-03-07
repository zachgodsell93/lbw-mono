import React from "react";
import { RatingsProvider } from "@/providers/ratings-provider";
type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <RatingsProvider>{children}</RatingsProvider>;
}
