import { validateRequest } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { progressTable } from "@/lib/server/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

// Get anime progress of logged user
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const animeId = searchParams.get("id");
	if (!animeId) {
		return new Response("Pass anime id as param", {
			status: 400,
		});
	}

	const { user, session } = await validateRequest();

	if (!user || !session) {
		return new Response("Must be logged in", {
			status: 401,
		});
	}

	const progress = await db
		.select()
		.from(progressTable)
		.where(
			and(
				eq(progressTable.userId, user.id),
				eq(progressTable.animeId, parseInt(animeId)),
			),
		)
		.get();

	if (!progress) {
		return new Response(`Progress of anime with id ${animeId} not found`, {
			status: 404,
		});
	}

	return Response.json(progress);
}
