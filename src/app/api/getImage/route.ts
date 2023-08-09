import getBase64 from "@/lib/getBase64Image";
import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  img: z.string().url(),
});

export async function POST(request: Request) {
  const body = await request.json();
  try {
    requestSchema.parse(body);
  } catch (error) {
    return NextResponse.json(error);
  }

  const img = await getBase64(body.img);

  if (!img) return NextResponse.json({ message: "Couldn't process the image" });

  return NextResponse.json(img);
}
