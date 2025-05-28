import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, SupplyType } from "@prisma/client";
import { z } from "zod";

// Prisma Client
const prisma = new PrismaClient();

// Zod Schema
const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  cpf: z.string().min(11).max(14),
  city: z.string(),
  state: z.string().length(2),
  supply: z.enum(["MONOPHASIC", "BIPHASIC", "TRIPHASIC"]),
  bill: z.number(),
});

// GET: List all leads
export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return NextResponse.json(leads);
}

// POST: Create a new lead
export async function POST(request: NextRequest) {
  const body = await request.json();

  const parseResult = leadSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid data", issues: parseResult.error.issues }, { status: 400 });
  }

  const data = parseResult.data;

  const lead = await prisma.lead.create({
    data: {
      ...data,
      // Prisma espera supply como enum, e bill como Decimal(string)
      supply: data.supply as SupplyType,
      bill: String(data.bill),
    },
  });

  return NextResponse.json(lead, { status: 201 });
}

// DELETE: Delete lead (recebe id via query param)
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await prisma.lead.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
}
