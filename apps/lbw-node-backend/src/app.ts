import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRouter from "./routes/health";
import testRouter from "./routes/test";
import { startCronJobs } from "./cron";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
}

const app = express();

app.use(cors());
app.use(healthRouter);
app.use(testRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  if (process.env.NODE_ENV === "development" && process.env.ENABLE_CRON === "false") {
    console.log("Cron jobs disabled (ENABLE_CRON=false in development)");
  } else {
    startCronJobs();
  }
});
