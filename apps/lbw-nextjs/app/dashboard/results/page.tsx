"use client";
import React from "react";
import { useUser } from "@/providers/user-provider";
import ResultsTable from "@/components/results/results-table";
import ResultsTableControls from "@/components/results/results-table-controls";
import { motion } from "framer-motion";
import PageFade from "@/components/shared/page-fade";

type Props = {};

export default function Results({}: Props) {
  const { results } = useUser();
  if (!results) return null;
  return (
    <PageFade>
      <main className="grid items-start gap-4 min-w-full pt-10 sm:px-6">
        <div className="flex items-center w-full">
          <ResultsTableControls />
        </div>
        <div className="flex w-full">
          <ResultsTable results={results?.results} />
        </div>
      </main>
    </PageFade>
  );
}
