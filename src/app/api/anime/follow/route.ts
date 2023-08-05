import { getXataClient } from "@/xata/xata"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { anime, user } = await request.json()
  const xata = getXataClient()
  const progress = await xata.db.progress.create({ user, anime })
  return NextResponse.json(progress)
}
