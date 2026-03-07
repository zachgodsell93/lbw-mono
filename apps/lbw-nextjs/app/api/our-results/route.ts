import {
  ErrorReturn,
  OurResultsReturn,
  getOurResults,
} from "@/utils/supabase/data";

export async function POST(req: Request) {
  const { timeFrame } = await req.json();
  const results: ErrorReturn | OurResultsReturn = await getOurResults(
    timeFrame
  );
  if ("error" in results) {
    return new Response(results.error, { status: 500 });
  }
  console.log(`[API] our-results fetched successfully timeFrame=${timeFrame}`);
  return new Response(JSON.stringify(results), { status: 200 });
}
