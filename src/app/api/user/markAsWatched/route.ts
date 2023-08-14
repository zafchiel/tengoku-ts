import { getXataClient } from "@/xata/xata"
import { NextResponse } from "next/server"

export async function PATCH(request: Request) {
  const { progress_id, user_id, anime_id, progress, status } =
    await request.json()
  const xata = getXataClient()

  const updatedProgress = await xata.db.progress.createOrUpdate(progress_id, {
    progress,
    status,
    user: user_id,
    anime: anime_id,
  })

  return NextResponse.json(updatedProgress)
}
