"use server";

import { validateRequest } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { progressTable, WATCHING_STATUSES } from "@/lib/server/db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerAction, createServerActionProcedure } from "zsa";

const authedProcedure = createServerActionProcedure().handler(async () => {
  try {
    const { user } = await validateRequest();

    if (!user) {
      throw new Error("User not authenticated");
    }

    return {
      user,
    };
  } catch {
    throw new Error("User not authenticated");
  }
});

export const addNewAnimeProgressEntry = authedProcedure
  .createServerAction()
  .input(
    z.object({
      animeId: z.number(),
      maxEpisodes: z.number().nullable(),
      animeTitle: z.string(),
      animePoster: z.string().nullable(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const { user } = ctx;

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

export const updateAnimeProgressEntry = authedProcedure
  .createServerAction()
  .input(updateSchema)
  .handler(async ({ input, ctx }) => {
    const { user } = ctx;

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

export const updateAnimeProgressEntryByForm = authedProcedure
  .createServerAction()
  .input(updateSchema, {
    type: "formData",
  })
  .handler(async ({ input, ctx }) => {
    const { user } = ctx;

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

export const deleteAnimeProgressEntry = authedProcedure
  .createServerAction()
  // input is Progress id
  .input(z.number())
  .handler(async ({ input, ctx }) => {
    const { user } = ctx;

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

export const markSeriesAsCompleted = authedProcedure
  .createServerAction()
  .input(
    z.object({
      progressId: z.number(),
      maxEpisodes: z.number(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const { user } = ctx;

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
