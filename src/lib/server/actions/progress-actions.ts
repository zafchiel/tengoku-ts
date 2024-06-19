"use server";

import { validateRequest } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { progressTable, WATCHING_STATUSES } from "@/lib/server/db/schema";
import { z, ZodError } from "zod";
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
      return null;
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
      return null;
    }
  });

// export async function addAnimeProgress(
//   animeId: number,
//   maxEpisodes: number | null
// ): Promise<{
//   error: string | null;
//   data: ProgressRecordType | null;
// }> {
//   const { user } = await validateRequest();

//   if (!user) {
//     cookies().set("redirect", `/anime/${animeId}`);
//     redirect("/login");
//     // return {
//     //     error: "Must be logged in",
//     //     data: null
//     // }
//   }

//   try {
//     const validatedMaxEpisodes =
//       maxEpisodes === null
//         ? undefined
//         : z.number().optional().parse(maxEpisodes);
//     const res = await db
//       .insert(progressTable)
//       .values({
//         animeId: z.number().parse(animeId),
//         maxEpisodes: validatedMaxEpisodes,
//         userId: user.id,
//       })
//       .returning()
//       .get();

//     return {
//       error: null,
//       data: res,
//     };
//   } catch (e) {
//     console.log(e);
//     return {
//       error: "Something went wrong",
//       data: null,
//     };
//   }
// }

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
      return null;
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
      return null;
    }
  });

// export async function updateAnimeProgress(formData: FormData): Promise<{
//   error: string | null;
//   data: ProgressRecordType | null;
// }> {
//   const { user } = await validateRequest();

//   if (!user) {
//     return {
//       error: "Must be logged in",
//       data: null,
//     };
//   }

//   const data = Object.fromEntries(formData.entries());

//   try {
//     const validatedData = updateSchema.parse(data);
//     const res = await db
//       .update(progressTable)
//       .set(validatedData)
//       .where(
//         and(
//           eq(progressTable.userId, user.id),
//           eq(progressTable.animeId, validatedData.animeId)
//         )
//       )
//       .returning()
//       .get();

//     return {
//       error: null,
//       data: res,
//     };
//   } catch (e) {
//     console.log(e);
//     if (e instanceof ZodError) {
//       return {
//         error: e.errors[0].message,
//         data: null,
//       };
//     } else {
//       return {
//         error: "Something went wrong",
//         data: null,
//       };
//     }
//   }
// }
