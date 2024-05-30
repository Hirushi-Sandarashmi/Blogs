"use server";

import { signIn } from "#/auth";
import { redirect } from "next/navigation";

export const loginAction = async (formData: FormData) => {
  try {
    await signIn("credentials", formData, { redirect: "/" });
  } catch (e: any) {
    redirect("/login?error=" + e.code);
  }
};
