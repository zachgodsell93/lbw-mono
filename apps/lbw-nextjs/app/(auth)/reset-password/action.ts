"use server";

import { redirect } from "next/navigation";
import { Logger } from "next-axiom";
import { createClient } from "@/utils/supabase/server";

export async function setNewPassword(formData: FormData) {
  const log = new Logger();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: data.password,
  });
  if (error) {
    log.error("password reset error", { email: data.email, error: error });
    redirect(
      `/password-reset?error=${error.message}&id=${new Date().getTime()}`
    );
  }
  log.info("password reset success", { email: data.email });
  redirect(`/dashboard`);
}
