import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { prisma } from "@/app/lib/prisma"

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const header = [
    "LeadID", "Name", "Email", "Phone", "CPF", "City", "State", "Supply", "Bill", "CreatedAt"
  ];
  const rows = leads.map(l =>
    [
      l.id,
      l.name,
      l.email,
      l.phone,
      l.cpf,
      l.city,
      l.state,
      l.supply,
      l.bill,
      l.createdAt.toISOString()
    ]
  );

  // Junta por ponto e vírgula, sem aspas
  const csv =
    header.join(";") + "\n" +
    rows.map(r => r.join(";")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=leads.csv"
    }
  });
}
