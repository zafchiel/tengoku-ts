import { getUserProgress } from "@/xata/progress"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const user_id = searchParams.get("user_id")
  if (!user_id) return NextResponse.json("Provide user_id param")

  try {
    const progress = await getUserProgress(user_id)
    console.log(progress)
    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json(error)
  }
}
