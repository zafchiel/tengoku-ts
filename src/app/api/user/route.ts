import { validateRequest } from "@/lib/server/auth";

// Get user from the request
export async function GET() {
	const { user, session } = await validateRequest();

	if (!user || !session) {
		return new Response("Unauthorized", {
			status: 402,
		});
	} else if (user && session) {
		return Response.json({ ...user });
	}
}
