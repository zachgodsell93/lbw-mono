import cron from "node-cron";
import axios from "axios";
import { executeStarterPackage } from "../services/starter-package";
import { executeLadbrokesPrices } from "../services/ladbrokes-prices";
import { executeVolumeAndResults } from "../services/volume-and-results";
import { executeLadbrokesPriceTwo } from "../services/ladbrokes-prices-two";
import { executeLadbrokesDataForToday } from "../services/ladbrokes-data-today";
import { log } from "../lib/logger";

const port = process.env.PORT || 3001;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

async function withRetry<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      if (attempt < MAX_RETRIES) {
        log({
          message: `${name} failed (attempt ${attempt}/${MAX_RETRIES}), retrying in ${RETRY_DELAY_MS / 1000}s...`,
          status: 500,
          level: "warning",
          data: { attempt, error: err.message ?? err },
        });
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      } else {
        log({
          message: `${name} failed after ${MAX_RETRIES} attempts`,
          status: 500,
          level: "error",
          data: { error: err.message ?? err },
        });
        throw err;
      }
    }
  }
  throw new Error("unreachable");
}

export function startCronJobs() {
  // Starter Package Execute — every minute
  cron.schedule("* * * * *", async () => {
    try {
      const hadRace = await withRetry("starterPackageExecute", executeStarterPackage);
      if (hadRace) {
        log({
          message: "starterPackageExecute finished",
          status: 200,
          level: "info",
          data: { finished: new Date().toISOString() },
        });
      }
    } catch (err: any) {
      // Already logged by withRetry
    }
  });

  // Ladbrokes Prices — every minute
  cron.schedule("* * * * *", async () => {
    try {
      await withRetry("getLadbrokesPrices", executeLadbrokesPrices);
      log({
        message: "getLadbrokesPrices completed successfully",
        status: 200,
        level: "info",
        data: { finished: new Date().toISOString() },
      });
    } catch (err: any) {
      // Already logged by withRetry
    }
  });

  // Volume and Results — every minute
  cron.schedule("* * * * *", async () => {
    try {
      await withRetry("getVolumeAndResults", executeVolumeAndResults);
      log({
        message: "getVolumeAndResults completed successfully",
        status: 200,
        level: "info",
        data: { finished: new Date().toISOString() },
      });
    } catch (err: any) {
      // Already logged by withRetry
    }
  });

  // Ladbrokes Prices Two — every minute
  cron.schedule("* * * * *", async () => {
    try {
      await withRetry("ladbrokesPriceTwo", executeLadbrokesPriceTwo);
      log({
        message: "ladbrokesPriceTwo completed successfully",
        status: 200,
        level: "info",
        data: { finished: new Date().toISOString() },
      });
    } catch (err: any) {
      // Already logged by withRetry
    }
  });

  // Ladbrokes Data For Today — every 10 minutes
  cron.schedule("*/10 * * * *", async () => {
    try {
      await withRetry("getLadbrokesDataForToday", executeLadbrokesDataForToday);
      log({
        message: "getLadbrokesDataForToday completed successfully",
        status: 200,
        level: "info",
        data: { finished: new Date().toISOString() },
      });
    } catch (err: any) {
      // Already logged by withRetry
    }
  });

  // Health check — every 5 minutes
  cron.schedule("*/5 * * * *", async () => {
    try {
      const res = await axios.get(`http://localhost:${port}/health`);
      log({
        message: "Health check",
        status: 200,
        level: "info",
        data: { response: res.data },
      });
    } catch (err: any) {
      log({
        message: "Health check failed",
        status: 500,
        level: "error",
        data: { error: err.message ?? err },
      });
    }
  });

  log({ message: "Cron jobs started", status: 200, level: "info", data: {} });
}
