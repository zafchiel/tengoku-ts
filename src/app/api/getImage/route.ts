import getBase64 from "@/lib/get-base64-image";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const img = searchParams.get("img");

  if (!img) {
    return NextResponse.json({ message: "Provide img param" });
  }

  const base64IMG = await getBase64(img);

  if (!base64IMG) {
    return NextResponse.json({ message: "Couldn't process the image" });
  }
  
  return NextResponse.json(base64IMG);
}
