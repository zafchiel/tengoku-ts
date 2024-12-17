import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogoutForm } from "@/components/profile-page/logout-form";
import ProgressSection from "@/components/profile-page/progress-section";
import ProgressSectionNavigation from "@/components/profile-page/progress-section-navigation";
import SyncMal from "@/components/profile-page/sync-mal";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const malData = JSON.parse((await cookies()).get("mal_data")?.value || "{}");
  console.log({ malData });

  return (
    <main className={cn("p-3 flex flex-col md:pt-14 container")}>
      <header className="flex flex-wrap items-center justify-between md:my-16">
        <div>
          <h2 className="text-3xl md:text-6xl font-light">
            {session.user.name}
          </h2>
          <p className="text-muted-foreground capitalize">My watch list</p>
          <SyncMal />
        </div>

        <LogoutForm />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,300px)_minmax(450px,1fr)] gap-4 items-start">
        <ProgressSectionNavigation />
        <ProgressSection />
      </div>
    </main>
  );
}
