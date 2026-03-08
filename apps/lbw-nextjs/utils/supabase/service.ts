import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sb.laybackandwin.au";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6c3BjdG55eW1kZ3Jlb3htb2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM2MTg1OTAsImV4cCI6MjAwOTE5NDU5MH0.QPi1YUJc8WolXyoMGJWuzDa9x2jGAd794mElafHWecM";

export function createServiceClient() {
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
}
