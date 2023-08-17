import { getXataClient } from "@/xata/xata";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const { user_id, anime_id, progress, status } = await request.json();
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
