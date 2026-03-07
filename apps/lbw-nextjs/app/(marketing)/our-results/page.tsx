"use client";
import React from "react";
import OurResultsChart from "@/components/our-results/OurResultsChart";
import { HeaderSection } from "@/components/shared/header-section";
import PageFade from "@/components/shared/page-fade";
import axios from "axios";
import { ResultStats } from "@/components/our-results/OurResultsChart";
import { WebsiteResults } from "@/types/customData.types";
import OurResultsMetrics from "@/components/our-results/OurResultsMetrics";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";

type Props = {};

export default function OurResults({}: Props) {
  const [results, setResults] = React.useState<WebsiteResults[] | null>(null);
  const [stats, setStats] = React.useState<ResultStats | null>(null);
  const [selected, setSelected] = React.useState("all");

  React.useEffect(() => {
    axios.post(`/api/our-results`, { timeFrame: selected }).then((res) => {
      setResults(res.data.results);
      setStats(res.data.stats);
    });
  }, [selected]);

  if (!results || !stats) return null;

  return (
    <PageFade>
      <div className="container py-20">
        <div className="flex flex-col gap-y-10">
          <HeaderSection
            title="Our Results"
            // label="Our Results"
            subtitle="We are proud of our results and we want to share them with you. Pulled directly from our live database"
          />

          <Tabs
            className=""
            value={selected}
            onValueChange={(e) => {
              setSelected(e);
            }}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                className=" data-[state=active]:bg-blue-400"
                value="all"
              >
                All Time
              </TabsTrigger>
              <TabsTrigger
                className=" data-[state=active]:bg-blue-400"
                value="month"
              >
                Past Month
              </TabsTrigger>
              <TabsTrigger
                className=" data-[state=active]:bg-blue-400"
                value="week"
              >
                Past Week
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <OurResultsMetrics metrics={stats} />
          <OurResultsChart results={results} />
        </div>
      </div>
    </PageFade>
  );
}
