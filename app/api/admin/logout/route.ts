import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_auth", "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
