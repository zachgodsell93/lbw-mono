"use client";
import React from "react";
import MetricsTop from "@/components/dashboard/metrics-top";
import NextUp from "@/components/dashboard/next-up";
import ResultedOrders from "@/components/dashboard/resulted-orders";
import ResultsChart from "@/components/dashboard/results-chart";
import UpcomingOrders from "@/components/dashboard/upcoming-orders";
import { UpcomingRacesProvider } from "@/providers/upcoming-races-provider";
import { useUser } from "@/providers/user-provider";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useUser();

  const metricsTopRef = React.useRef<HTMLDivElement>(null);
  if (!user) return null;

  return (
    <motion.div
      className="w-full"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <main className="flex w-full min-h-screen flex-col px-10 gap-y-10 pt-10">
        <div className="flex w-full flex-row max-lg:flex-col max-lg:gap-y-10 gap-x-10">
          <div className="w-1/2 max-lg:w-full">
            <div ref={metricsTopRef}>
              <MetricsTop />
            </div>
          </div>
          <div id="metrics-top" className="w-1/2 max-lg:w-full">
            <NextUp metricRef={metricsTopRef} />
          </div>
        </div>
        <div className="flex flex-row max-lg:flex-col-reverse max-lg:gap-y-10 gap-x-10">
          <div data-testid="results-chart" className="w-1/2 max-lg:w-full">
            <ResultsChart />
          </div>
          <div
            id="orders"
            className="w-1/2 flex flex-col gap-y-10 max-lg:w-full"
          >
            <UpcomingOrders />
            <ResultedOrders />
          </div>
        </div>
      </main>
    </motion.div>
  );
}
