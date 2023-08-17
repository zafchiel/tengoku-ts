import { getServerSession } from "next-auth";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { getXataClient } from "@/xata/xata";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MarkAllButton from "@/components/feedPage/markAllButton";

export default async function FeedPage() {
  const session = await getServerSession(authConfig);
  if (!session?.user) redirect("/api/auth/signin?callbackUrl=/feed");

  const xata = getXataClient();
  const userProgress = await xata.db.progress
    .filter({ user: session.user, status: "Watching" })
    .select([
      "*",
      "anime.title",
      "anime.image",
      "anime.totalEpisodes",
      "anime.id",
      "anime.status",
    ])
    .getAll();

  return (
    <main className="p-4 w-screen md:pt-14">
      <section className="mb-3">
        <h1 className="text-6xl font-bold">feed</h1>
        <p className="text-muted-foreground">
          watch recent episodes of followed anime
        </p>
      </section>
      <section className="flex flex-col sm:grid grid-cols-2 lg:grid-cols-3 gap-2">
        {userProgress.map((record) => (
          <div
            key={record.id}
            className="border rounded-md p-2 max-h-96 overflow-y-scroll"
          >
            <Link href={`/${record.anime?.id}`}>
              <h4 className="text-xl font-semibold">
                {record.anime?.title}{" "}
                <span className="text-muted-foreground text-sm">
                  - status {record.anime?.status}
                </span>
              </h4>
            </Link>
            <p className="text-muted-foreground">
              Followed at: &nbsp;
              {record.xata.createdAt.toLocaleDateString()}
            </p>
            <div className="flex gap-1 w-full items-start">
              {record.anime?.image && (
                <Image
                  src={record.anime.image}
                  width={80}
                  height={100}
                  alt="Anime image"
                  className="w-32 h-36 aspect-[4/5] rounded-sm"
                />
              )}
              <div className="flex flex-wrap gap-1">
                {Array.from(
                  { length: record?.anime?.totalEpisodes || 0 },
                  (_, i) => (
                    <Link
                      href={`/${record?.anime?.id}/watch/${record.anime
                        ?.id}-episode-${i + 1}`}
                      key={i}
                      className={cn(
                        "p-4 w-12 h-12 border flex justify-center items-center rounded-lg hover:bg-foreground hover:text-background bg-background",
                        {
                          "bg-foreground text-background":
                            i <= record.progress!,
                        },
                      )}
                    >
                      {i + 1}
                    </Link>
                  ),
                ).reverse()}
              </div>
            </div>
            <MarkAllButton
              progress_id={record.id}
              user_id={session.user?.id!}
              totalEpisodes={record.anime?.totalEpisodes!}
              anime_status={record.anime?.status!}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
