import { getXataClient } from "@/xata/xata";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { recordId } = await request.json();
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
