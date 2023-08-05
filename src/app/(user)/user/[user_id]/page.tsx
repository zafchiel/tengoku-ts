import { redirect } from "next/navigation"
import { authConfig } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { getXataClient } from "@/xata/xata"

export default async function ProfilePage() {
  const session = await getServerSession(authConfig)

  if (!session) redirect(`/api/auth/signin`)

  const xata = getXataClient()
  const progress = xata.db.progress
    .filter({
      user: session.user?.id,
    })
    .select(["*", "anime.title", "anime.totalEpisodes"])
    .getMany()
  console.log(progress)

  return (
    <main className="container flex flex-col">
      <div className="w-full pt-14 flex justify-between">
        <section>
          <h1 className="text-6xl font-bold">{session.user?.name}</h1>
          <p className="text-muted-foreground">{session.user?.email}</p>
        </section>
        {session.user?.image && (
          <section>
            <Avatar className="w-80 h-80">
              <AvatarImage src={session.user?.image} />
            </Avatar>
          </section>
        )}
      </div>
      <div>
        <section>
          <h3 className="text-3xl font-bold">Currenlty watching</h3>
          <div className="flex flex-col">
            {(await progress).map((obj) => (
              <div key={obj.id} className="flex gap-2">
                <p className="font-semibold">{obj.anime?.title}</p>
                <p className="text-sm">
                  Progress: {obj.progress}/{obj.anime?.totalEpisodes}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
