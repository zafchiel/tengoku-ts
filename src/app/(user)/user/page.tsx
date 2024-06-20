import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { validateRequest } from "@/lib/server/auth";
import { LogoutForm } from "@/components/profile-page/logout-form";
import { db } from "@/lib/server/db";
import { progressTable } from "@/lib/server/db/schema";
import { eq } from "drizzle-orm";
import ProgressSection from "@/components/profile-page/progress-section";

export default async function ProfilePage() {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    redirect("/login");
  }

  const progress = await db
    .select()
    .from(progressTable)
    .where(eq(progressTable.userId, user.id));

  return (
    <main className={cn("p-3 flex flex-col md:pt-14 container")}>
      <section className="flex flex-wrap items-center justify-between mb-8">
        <h1 className="text-6xl font-bold">{user.username}</h1>
        <LogoutForm />
      </section>

      <ProgressSection />
    </main>
  );
}
