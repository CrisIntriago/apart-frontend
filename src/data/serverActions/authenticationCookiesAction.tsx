"use server";

import { cookies } from "next/headers";

export interface ISessionStorage {
  sessionToken: string | null;
  uid: string | null;
  hasCourse: boolean | null;
  hasAccess?: boolean | null;
}

export const setSessionStorageCookies = async ({
  sessionToken,
  uid,
  hasCourse,
  hasAccess,
}: ISessionStorage): Promise<void> => {
  const cookieStore = cookies();
  const isProduction = process.env.NODE_ENV === "production";
  cookieStore.set("sessionToken", sessionToken || "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });
  cookieStore.set("uid", uid || "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });
  cookieStore.set("hasCourse", String(hasCourse ?? false), {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });
  cookieStore.set("hasAccess", String(hasAccess ?? false), {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
  });
};

export const getSessionStorageCookies = async (): Promise<ISessionStorage> => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const uid = cookieStore.get("uid");
  const hasCourse = cookieStore.get("hasCourse");
  const hasAccess = cookieStore.get("hasAccess");
  return {
    sessionToken: sessionToken?.value || null,
    uid: uid?.value || null,
    hasCourse: hasCourse ? hasCourse.value === "true" : null,
    hasAccess: hasAccess ? hasAccess.value === "true" : null,
  };
};


export const removeSessionStorageCookies = async (): Promise<void> => {
  const cookieStore = cookies();
  cookieStore.delete("sessionToken");
  cookieStore.delete("uid");
  cookieStore.delete("hasCourse");
  cookieStore.delete("embedded");
  cookieStore.delete("hasAccess");
};
