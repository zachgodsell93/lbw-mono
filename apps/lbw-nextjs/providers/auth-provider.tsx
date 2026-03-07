// "use client";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <>{children}</>;
}
