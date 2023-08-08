import { redirect } from "next/navigation";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import EditSheet from "@/components/profilePage/editSheet";
import { getUserProgress } from "@/types/progress";

export default async function ProfilePage() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user) redirect(`/api/auth/signin`);

  const progress = await getUserProgress(session.user?.id);

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
          <div className="flex flex-col gap-5">
            {progress.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-around gap-2 border rounded-sm p-2"
              >
                <Link href={`/${record.anime?.id}`} className="font-semibold">
                  {record.anime?.title}
                </Link>
                <div className="flex flex-col">
                  <p className="text-sm w-24">
                    Progress: {record.progress}/{record.anime?.totalEpisodes}
                  </p>
                  <EditSheet />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
