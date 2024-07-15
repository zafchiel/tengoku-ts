import { validateRequest } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { progressTable } from "@/lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
	const { user, session } = await validateRequest();

	if (!user || !session) {
		return new Response("Unauthorized", {
			status: 402,
		});
	} else if (user && session) {
		try {
			const res = await db
				.select()
				.from(progressTable)
				.where(eq(progressTable.userId, user.id));

			return Response.json(res);
		} catch (error) {
			return new Response("An error occurred. Please try again.", {
				status: 500,
			});
		}
	}
}
