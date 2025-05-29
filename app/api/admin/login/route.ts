import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // Simples: define um cookie de sessão (exemplo, pode aprimorar depois)
    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_auth", "true", { httpOnly: true, path: "/" });
    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
