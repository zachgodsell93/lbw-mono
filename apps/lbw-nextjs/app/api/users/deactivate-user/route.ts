import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const { userId, settingsId } = body;
  if (!userId || !settingsId) {
    return new Response("Missing required fields", { status: 400 });
  }
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    ban_duration: "35000h",
  });
  if (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
  const { data: settingsData, error: settingsError } = await supabase
    .from("user_settings")
    .update({
      tbb4_bot: false,
    })
    .eq("id", settingsId);
  if (settingsError) {
    return new Response(JSON.stringify(settingsError), { status: 500 });
  }
  console.log(`[API] deactivate-user completed successfully userId=${userId}`);
  return new Response(JSON.stringify(data), { status: 200 });
}
