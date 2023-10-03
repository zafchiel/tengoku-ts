import { getXataClient } from "@/xata/xata";
import { NextResponse } from "next/server";
import z from "zod";

export async function DELETE(request: Request) {
  const body = await request.json();
  const { recordId } = z.object({ recordId: z.string() }).parse(body);
  const xata = getXataClient();
  try {
    const progress = await xata.db.progress.delete(recordId);
    return NextResponse.json({
      message: "Successfully deleted record",
      record: progress,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Could not delete record",
      error,
    });
  }
}
