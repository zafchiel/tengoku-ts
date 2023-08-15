import { getAnimeProgress, getUserProgress } from "@/xata/progress";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  const anime_id = searchParams.get("anime_id");
  if (!user_id) return NextResponse.json("Provide user_id param");

  if (!anime_id) {
    try {
      const progress = await getUserProgress(user_id);
      return NextResponse.json(progress);
    } catch (error) {
      return NextResponse.json(error);
    }
  }

  try {
    const animeProgress = await getAnimeProgress(user_id, anime_id);
    return NextResponse.json(animeProgress);
  } catch (error) {
    return NextResponse.json(error);
  }
}
