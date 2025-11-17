import { NextResponse } from "next/server";
import { readSession } from "@/features/auth/server";

export async function GET() {
  const session = await readSession();

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json(session.user, { status: 200 });
}
