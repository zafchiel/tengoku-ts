import { getXataClient } from "@/xata/xata"
import { NextResponse } from "next/server"
import { z } from "zod"

const requestSchema = z.object({
  recordId: z.string(),
  status: z.string(),
  score: z.coerce
    .number({
      required_error: "Score is required",
      invalid_type_error: "Score must be a number",
    })
    .min(0)
    .max(10)
    .optional(),
  progress: z.coerce.number().min(0),
})

export async function POST(request: Request) {
  const body: z.infer<typeof requestSchema> = await request.json()
  let res
  try {
    const xata = getXataClient()
    requestSchema.parse(body)
    res = await xata.db.progress.update(body.recordId, {
      status: body.status,
      progress: body.progress,
      score: body.score,
    })
  } catch (error) {
    return NextResponse.json(error)
  }

  return NextResponse.json(res)
}
