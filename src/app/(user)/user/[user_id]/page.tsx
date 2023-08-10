import { redirect } from "next/navigation"
import { authConfig } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import ProgressSection from "@/components/profilePage/progressSection"

export default async function ProfilePage() {
  const session = await getServerSession(authConfig)

  if (!session?.user) redirect(`/api/auth/signin`)

  return (
    <main className="p-3 flex flex-col">
      <section className="pt-14 w-full text-right">
        <h1 className="text-6xl font-bold">{session.user?.name}</h1>
        <p className="text-muted-foreground">{session.user?.email}</p>
      </section>
      <div>
        <section className="mt-5">
          <h3 className="text-3xl font-bold">Currenlty watching</h3>
          <ProgressSection user={session.user} />
        </section>
      </div>
    </main>
  )
}
