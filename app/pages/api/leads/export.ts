// pages/api/leads/export.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/app/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed')
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const header = [
      "LeadID", "Name", "Email", "Phone", "CPF", "City", "State", "Supply", "Bill", "CreatedAt"
    ]

    const rows = leads.map(l => [
      l.id, l.name, l.email, l.phone, l.cpf, l.city, l.state, l.supply, l.bill, l.createdAt.toISOString()
    ])

    const csv = header.join(";") + "\n" + rows.map(r => r.join(";")).join("\n")

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv')
    res.status(200).send(csv)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
