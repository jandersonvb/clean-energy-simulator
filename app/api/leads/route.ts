import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  cpf: z.string().min(11),
  city: z.string(),
  state: z.string().length(2),
  supply: z.enum(["MONOPHASIC", "BIPHASIC", "TRIPHASIC"]),
  bill: z.number(),
});

// GET: Lista todos os leads
export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(leads);
}

// POST: Cria novo lead
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
      supply: data.supply,
      bill: String(data.bill),
    },
  });
  return NextResponse.json(lead, { status: 201 });
}
