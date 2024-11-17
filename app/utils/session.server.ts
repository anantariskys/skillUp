// utils/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.SESSION_SECRET || "secret"],
    sameSite: "lax",
    maxAge: 60 * 60 ,
  },
});

export async function getSession(cookieHeader: string | null) {
  return sessionStorage.getSession(cookieHeader);
}

export async function commitSession(session: any) {
  return sessionStorage.commitSession(session);
}
export async function destroySession(session: any) {
  return sessionStorage.destroySession(session);
}
