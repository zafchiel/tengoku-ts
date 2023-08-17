import { getXataClient } from "@/xata/xata";
import { NextResponse } from "next/server";
import z from "zod";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { progress_id, user_id, anime_id, progress, status } = z
    .object({
      progress_id: z.string(),
      user_id: z.string(),
      anime_id: z.string(),
      progress: z.number(),
      status: z.string(),
    })
    .parse(body);
  const xata = getXataClient();

  const updatedProgress = await xata.db.progress.createOrUpdate(progress_id, {
    progress,
    status,
    user: user_id,
    anime: anime_id,
  });

  return NextResponse.json(updatedProgress);
}
