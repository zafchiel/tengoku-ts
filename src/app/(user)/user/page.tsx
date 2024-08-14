import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { validateRequest } from "@/lib/server/auth";
import { LogoutForm } from "@/components/profile-page/logout-form";
import ProgressSection from "@/components/profile-page/progress-section";
import ProgressSectionNavigation from "@/components/profile-page/progress-section-navigation";

export default async function ProfilePage() {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    redirect("/login");
  }

  return (
    <main className={cn("p-3 flex flex-col md:pt-14 container")}>
      <header className="flex flex-wrap items-center justify-between md:my-24">
        <div>
          <h2 className="text-3xl md:text-6xl font-light">{user.username}</h2>
          <p className="text-muted-foreground capitalize">My watch list</p>
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
