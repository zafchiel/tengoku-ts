"use server";

import { validateRequest } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { progressTable, WATCHING_STATUSES } from "@/lib/server/db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerAction } from "zsa";

export const addNewAnimeProgressEntry = createServerAction()
  .input(
    z.object({
      animeId: z.number(),
      maxEpisodes: z.number().nullable(),
      animeTitle: z.string(),
      animePoster: z.string().nullable(),
    })
  )
  .handler(async ({ input }) => {
    const { user } = await validateRequest();

    if (!user) {
      cookies().set("redirect", `/anime/${input.animeId}`);
      redirect("/login");
    }

    try {
      const res = await db
        .insert(progressTable)
        .values({
          userId: user.id,
          ...input,
        })
        .returning()
        .get();

      return res;
    } catch (error) {
      throw "An error occurred. Please try again.";
    }
  });

const updateSchema = z.object({
  animeId: z.coerce.number().int(),
  score: z.coerce.number().int().min(0).max(10),
  status: z.enum(WATCHING_STATUSES),
  episodesWatched: z.coerce.number().int().optional(),
});

export const updateAnimeProgressEntry = createServerAction()
  .input(updateSchema, {
    type: "formData",
  })
  .handler(async ({ input }) => {
    const { user } = await validateRequest();

    if (!user) {
      throw "Must be logged in to edit progress";
    }

    try {
      const res = await db
        .update(progressTable)
        .set(input)
        .where(
          and(
            eq(progressTable.userId, user.id),
            eq(progressTable.animeId, input.animeId)
          )
        )
        .returning()
        .get();

      return res;
    } catch (error) {
      console.log(error);
      throw "An error occurred. Please try again.";
    }
  });

export const deleteAnimeProgressEntry = createServerAction()
  // input is Progress id
  .input(z.number())
  .handler(async ({ input }) => {
    const { user } = await validateRequest();

    if (!user) {
      throw "Must be logged in to delete progress";
    }

    try {
      await db
        .delete(progressTable)
        .where(
          and(eq(progressTable.userId, user.id), eq(progressTable.id, input))
        );

      return "success";
    } catch (error) {
      throw "An error occurred. Please try again.";
    }
  });

export const markSeriesAsCompleted = createServerAction()
  .input(
    z.object({
      progressId: z.number(),
      maxEpisodes: z.number(),
    })
  )
  .handler(async ({ input }) => {
    const { user } = await validateRequest();

    if (!user) {
      throw "Must be logged in to edit progress";
    }

    try {
      await db
        .update(progressTable)
        .set({
          status: "Completed",
          episodesWatched: input.maxEpisodes,
        })
        .where(
          and(
            eq(progressTable.userId, user.id),
            eq(progressTable.id, input.progressId)
          )
        );

      return "success";
    } catch (error) {
      throw "An error occurred. Please try again.";
    }
  });
