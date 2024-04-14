"use server";

import {validateRequest} from "@/lib/server/auth";
import {db} from "@/lib/server/db";
import {progressTable} from "@/lib/server/db/schema";

export async function addAnimeProgress(animeId: number, maxEpisodes: number | null) {
    const { user } = await validateRequest();

    if(!user) {
        return {
            error: "Must be logged in",
            data: null
        }
    }

    try {
        const res = await db.insert(progressTable).values({
            animeId,
            maxEpisodes,
            userId: user.id
        }).returning().get();

        return {
            error: null,
            data: res
        }
    } catch (e) {
        return {
            error: "Something went wrong",
            data: null
        }
    }
}