import { Router, Request, Response } from "express";
import { executeStarterPackage } from "../services/starter-package";
import { executeLadbrokesPrices } from "../services/ladbrokes-prices";
import { executeVolumeAndResults } from "../services/volume-and-results";
import { executeLadbrokesPriceTwo } from "../services/ladbrokes-prices-two";
import { executeLadbrokesDataForToday } from "../services/ladbrokes-data-today";

const router = Router();

router.get("/test/starter-package", async (req: Request, res: Response) => {
  try {
    const result = await executeStarterPackage();
    res.json({ status: "ok", hadRace: result });
  } catch (err: any) {
    res.status(500).json({ status: "error", error: err.message ?? err });
  }
});

router.get("/test/ladbrokes-prices", async (req: Request, res: Response) => {
  try {
    await executeLadbrokesPrices();
    res.json({ status: "ok" });
  } catch (err: any) {
    res.status(500).json({ status: "error", error: err.message ?? err });
  }
});

router.get("/test/volume-and-results", async (req: Request, res: Response) => {
  try {
    await executeVolumeAndResults();
    res.json({ status: "ok" });
  } catch (err: any) {
    res.status(500).json({ status: "error", error: err.message ?? err });
  }
});

router.get("/test/ladbrokes-prices-two", async (req: Request, res: Response) => {
  try {
    await executeLadbrokesPriceTwo();
    res.json({ status: "ok" });
  } catch (err: any) {
    res.status(500).json({ status: "error", error: err.message ?? err });
  }
});

router.get("/test/ladbrokes-data-today", async (req: Request, res: Response) => {
  try {
    await executeLadbrokesDataForToday();
    res.json({ status: "ok" });
  } catch (err: any) {
    res.status(500).json({ status: "error", error: err.message ?? err });
  }
});

export default router;
