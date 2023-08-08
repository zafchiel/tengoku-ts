import { redirect } from "next/navigation"
import { authConfig } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import Link from "next/link"
import EditSheet from "@/components/profilePage/editSheet"
import { getUserProgress } from "@/xata/progress"
import { ProgressRecord } from "@/xata/xata"
import Image from "next/image"

export default async function ProfilePage() {
  const session = await getServerSession(authConfig)

  if (!session || !session.user) redirect(`/api/auth/signin`)

  const progress = await getUserProgress(session.user?.id)

  return (
    <main className="p-3 flex flex-col">
      <div className="w-full pt-14 text-right">
        <section>
          <h1 className="text-6xl font-bold">{session.user?.name}</h1>
          <p className="text-muted-foreground">{session.user?.email}</p>
        </section>
      </div>
      <div>
        <section className="mt-5">
          <h3 className="text-3xl font-bold">Currenlty watching</h3>
          <div className="flex flex-col gap-5 md:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {progress.map((record) => (
              <div
                key={record.id}
                className="flex justify-between gap-2 w-full h-full border rounded-sm p-2"
              >
                <div>
                  <Image
                    src={record.anime?.image!}
                    width={400}
                    height={500}
                    alt="Anime Image"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <Link href={`/${record.anime?.id}`} className="font-semibold">
                    {record.anime?.title}
                  </Link>
                  <div className="flex flex-col">
                    <p className="text-sm w-24">
                      Progress: {record.progress}/{record.anime?.totalEpisodes}
                    </p>
                    <EditSheet record={record} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
