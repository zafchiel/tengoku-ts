import getBase64 from "@/lib/getBase64Image"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const img = await getBase64(body.img)
  return NextResponse.json(img)
}
