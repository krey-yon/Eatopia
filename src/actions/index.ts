"use server";

import { getCurrentSession, deleteSession } from "@/lib/cookie";
import { invalidateSessions } from "@/lib/session";
import { redirect } from "next/navigation";

export const logoutActions = async () => {
  const { session } = await getCurrentSession();

  if (session === null) {
    return {
      message: "Not authenticated",
    };
  }

  await invalidateSessions(session.id);
  await deleteSession();
  return redirect("/signin");
};
