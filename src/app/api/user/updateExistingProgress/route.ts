import { getXataClient } from "@/xata/xata";
import { NextResponse } from "next/server";
import z from "zod";

export async function PATCH(request: Request) {
  const body = await request.json();
  const { user_id, anime_id, progress, status } = z
    .object({
      user_id: z.string(),
      anime_id: z.string(),
      progress: z.number(),
      status: z.string(),
    })
    .parse(body);
  const xata = getXataClient();

  const progressRecord = await xata.db.progress
    .filter({ anime: anime_id, user: user_id })
    .getFirst();

  if (progressRecord) {
    await xata.db.progress.update(progressRecord.id, {
      progress,
      status,
    });

    if (!progressRecord) {
      return NextResponse.json({ message: "Progress record doesn't exist" });
    }
    return NextResponse.json({ message: "Successfully updated progress" });
  }
}
