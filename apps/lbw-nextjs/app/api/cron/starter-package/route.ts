import { NextResponse } from "next/server";
import { executeStarterPackage } from "@/lib/cron/services/starter-package";
import { flush } from "@/lib/cron/logger";

export const maxDuration = 300;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await executeStarterPackage();
    return NextResponse.json({ ok: true, executed: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await flush();
  }
}
