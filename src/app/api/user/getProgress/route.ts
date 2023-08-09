import { getUserProgress } from "@/xata/progress"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { user_id } = await request.json()
  console.log(user_id)

  try {
    const progress = await getUserProgress(user_id)
    console.log(progress)
    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json(error)
  }
}
