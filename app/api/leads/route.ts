// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { z } from "zod";

// const prisma = new PrismaClient();

// const leadSchema = z.object({
//   name: z.string().min(2),
//   email: z.string().email(),
//   phone: z.string().min(10),
//   cpf: z.string().min(11),
//   city: z.string(),
//   state: z.string().length(2),
//   supply: z.enum(["MONOPHASIC", "BIPHASIC", "TRIPHASIC"]),
//   bill: z.number(),
// });

// // GET: Lista todos os leads
// export async function GET() {
//   const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
//   return NextResponse.json(leads);
// }

// // POST: Cria novo lead
// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const parseResult = leadSchema.safeParse(body);
//   if (!parseResult.success) {
//     return NextResponse.json({ error: "Invalid data", issues: parseResult.error.issues }, { status: 400 });
//   }
//   const data = parseResult.data;
//   const lead = await prisma.lead.create({
//     data: {
//       ...data,
//       supply: data.supply,
//       bill: String(data.bill),
//     },
//   });
//   return NextResponse.json(lead, { status: 201 });
// }

// /app/api/leads/route.ts

export async function GET() {
  return Response.json([
    {
      id: "1",
      name: "Usuário Demo",
      email: "demo@email.com",
      phone: "11999999999",
      cpf: "12345678900",
      city: "Cidade",
      state: "UF",
      supply: "MONOPHASIC",
      bill: 200,
      createdAt: new Date().toISOString()
    }
  ]);
}

export async function POST(request: Request) {
  // Só retorna sucesso fake
  return Response.json({ success: true, message: "Lead fake cadastrado (deploy dummy mode)" });
}
export async function DELETE(request: Request) {
  // Só retorna sucesso fake
  return Response.json({ success: true, message: "Lead fake excluído (deploy dummy mode)" });
}