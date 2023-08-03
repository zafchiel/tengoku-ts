import { redirect } from "next/navigation"
import { authConfig } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export default async function ProfilePage() {
  const session = await getServerSession(authConfig)

  if (!session) redirect(`/api/auth/signin`)
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
