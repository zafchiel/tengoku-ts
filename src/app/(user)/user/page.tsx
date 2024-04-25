import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { validateRequest } from "@/lib/server/auth";
import { LogoutForm } from "@/components/profile-page/logout-form";
import { db } from "@/lib/server/db";
import { progressTable } from "@/lib/server/db/schema";
import { eq } from "drizzle-orm";

export default async function ProfilePage() {
    const { user, session } = await validateRequest();

    if (!user || !session) {
        redirect("/login");
    }

    const progress = await db.select({
        animeId: progressTable.animeId,
        status: progressTable.status,
        score: progressTable.score,
        episodesWatched: progressTable.episodesWatched,
        maxEpisodes: progressTable.maxEpisodes
    }).from(progressTable).where(
        eq(
            progressTable.userId,
            user.id
        )
    );

    return (
        <main className={cn("p-3 flex flex-col md:pt-14 container")}>
            <section className="flex flex-wrap items-center justify-between">
                <h1 className="text-6xl font-bold">{user.username}</h1>
                <LogoutForm/>
            </section>

            <section>
        <pre>
          {JSON.stringify(progress, null, 2)}
        </pre>
            </section>
        </main>
    );
}