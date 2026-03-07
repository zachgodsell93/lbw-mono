"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Logger } from "next-axiom";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const log = new Logger();
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    log.error("user login error", { email: data.email, error: error });
    redirect(`/login?error=${error.message}&id=${new Date().getTime()}`);
  }
  log.info("user login success", { email: data.email });
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

export async function passwordReset(formData: FormData) {
  const log = new Logger();
  const data = {
    email: formData.get("email-reset") as string,
  };
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: "https://laybackandwin.com.au/reset-password",
  });
  if (error) {
    log.error("password reset error", { email: data.email, error: error });
    redirect(`/login?error=${error.message}&id=${new Date().getTime()}`);
  }
  log.info("password reset success", { email: data.email });
  redirect(`/login?success=resetSent&id=${new Date().getTime()}`);
}

// export async function signup(formData: FormData) {
//   const supabase = await createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     redirect("/error");
//   }

//   // revalidatePath("/", "layout");
//   redirect("/dashboard");
// }
