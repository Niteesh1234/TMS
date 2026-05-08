import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

function getNumericCodeValue(code: string) {
  const numericValue = Number(code.replace(/\D/g, ""));
  return Number.isNaN(numericValue) ? 48000 : numericValue;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const requiredFields = ["title", "requester", "company", "priority", "status", "owner", "sla"] as const;

  for (const field of requiredFields) {
    if (!body[field] || typeof body[field] !== "string" || body[field].trim().length === 0) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  const latestTicket = await prisma.dashboardTicket.findFirst({
    orderBy: { sortOrder: "desc" },
  });

  const nextSortOrder = (latestTicket?.sortOrder ?? 0) + 1;
  const nextCodeValue = latestTicket ? getNumericCodeValue(latestTicket.code) + 1 : 48000;

  const ticket = await prisma.dashboardTicket.create({
    data: {
      code: `ENT-${nextCodeValue}`,
      title: body.title.trim(),
      requester: body.requester.trim(),
      company: body.company.trim(),
      priority: body.priority.trim(),
      status: body.status.trim(),
      owner: body.owner.trim(),
      sla: body.sla.trim(),
      sortOrder: nextSortOrder,
    },
  });

  return NextResponse.json({ ticket }, { status: 201 });
}