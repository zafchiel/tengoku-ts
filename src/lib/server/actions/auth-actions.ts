"use server";

import { cookies } from "next/headers";
import { lucia, validateRequest } from "../auth";
import { redirect } from "next/navigation";

export async function logoutAction(): Promise<ActionResult> {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized",
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect("/login");
}

interface ActionResult {
	error: string | null;
}
