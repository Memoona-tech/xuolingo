/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ challengeOptionId: string }> }
) {
  const { challengeOptionId } = await context.params;
  if (!getIsAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, Number(challengeOptionId)),
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ challengeOptionId: string }> }
) {
  const { challengeOptionId } = await context.params;
  if (!getIsAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();
  const data = await db
    .update(challengeOptions)
    .set({ ...body })
    .where(eq(challengeOptions.id, Number(challengeOptionId)))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ challengeOptionId: string }> }
) {
  const { challengeOptionId } = await context.params;
  if (!getIsAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, Number(challengeOptionId)))
    .returning();

  return NextResponse.json(data[0]);
}
