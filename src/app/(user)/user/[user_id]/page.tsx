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
    .getMany()
  console.log(progress)

  return (
    <main className="w-full container pt-14 flex justify-between">
      <section>
        <h1 className="text-6xl">{session.user?.name}</h1>
        <p className="text-muted-foreground">{session.user?.email}</p>
      </section>
      {session.user?.image && (
        <section>
          <Avatar className="w-80 h-80">
            <AvatarImage src={session.user?.image} />
          </Avatar>
        </section>
      )}
    </main>
  )
}
