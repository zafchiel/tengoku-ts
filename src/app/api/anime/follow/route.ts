import { getXataClient } from "@/xata/xata";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
  const body = await request.json();
  const { anime, user } = z
    .object({ anime: z.string(), user: z.string() })
    .parse(body);
  const xata = getXataClient();
  console.log(anime);
  const progress = await xata.db.progress.create({ user, anime });
  return NextResponse.json(progress);
}
