import { createClient } from "@/utils/supabase/server";
export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;
  if (!email) {
    return new Response("Missing required fields", { status: 400 });
  }
  const supabase = await createClient();
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email,
  });
  if (error) {
    console.log(error);
    return new Response("Error resending confirmation email", { status: 500 });
  }
  console.log(`[API] resend-confirmation-email completed successfully email=${email}`);
  return new Response("Confirmation email resent", { status: 200 });
}
