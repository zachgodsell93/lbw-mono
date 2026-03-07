export async function GET(req: Request) {
  console.log("[API] health-check completed successfully");
  return new Response("OK", { status: 200 });
}
