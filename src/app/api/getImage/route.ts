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
    console.log(error);
  }

  const img = await getBase64(body.img);

  return NextResponse.json(img);
}
