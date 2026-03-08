import { NextResponse } from "next/server";
import { executeLadbrokesPriceTwo } from "@/lib/cron/services/ladbrokes-prices-two";
import { flush } from "@/lib/cron/logger";

export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await executeLadbrokesPriceTwo();
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await flush();
  }
}
