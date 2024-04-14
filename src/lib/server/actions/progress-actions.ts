"use server";

import {validateRequest} from "@/lib/server/auth";
import {db} from "@/lib/server/db";
import {progressTable} from "@/lib/server/db/schema";

export async function addAnimeProgress(animeId: number, maxEpisodes: number | null) {
    const { user } = await validateRequest();

    if(!user) {
        return {
            error: "Must be logged in",
        }
    }

    try {
        const res = await db.insert(progressTable).values({
            animeId,
            maxEpisodes,
            userId: user.id
        }).returning();

        return res
    } catch (e) {
        return {
            error: e.message
        }
    }
}