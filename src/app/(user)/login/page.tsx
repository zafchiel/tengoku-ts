import { Chrome, Github, Sun } from "lucide-react";
import { validateRequest } from "@/lib/server/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { user } = await validateRequest();

  if (user) {
    redirect("/");
  }

  return (
    <main className="container grid min-h-screen items-center">
      <section>
        <header className="text-left">
          <h1 className="text-3xl md:text-6xl font-bold uppercase leading-none">
            Welcome!
          </h1>
          <p className="text-muted-foreground leading-none md:pl-3 mb-4">
            login with your favorite provider
          </p>
        </header>
        <div className="flex flex-col md:grid grid-cols-2 gap-4 max-w-xl">
        <a
            href="/api/login/google"
            className="relative overflow-hidden border rounded-md hover:border-primary/40 transition-all duration-300"
          >
            <div className="bg-card/60 backdrop-blur-3xl p-4 h-full space-y-4">
              <span className="sr-only">Sign-in with Google</span>
              <div>
                <Chrome size={52} className="mx-auto" />
              </div>
              <p className="font-bold text-center">Google</p>
            </div>
            <div
              className={
                "absolute bottom-0 right-2 rounded-full h-20 w-20 -z-20 blur-xl bg-gray-500"
              }
            ></div>
          </a>

          <a
            href="/api/login/discord"
            className="relative overflow-hidden border rounded-md hover:border-primary/40 transition-all duration-300"
          >
            <div className="bg-card/60 backdrop-blur-3xl p-4 h-full space-y-4">
              <span className="sr-only">Sign-in with Discord</span>
              <div>
                <Sun size={52} className="mx-auto" />
              </div>
              <p className="font-bold text-center">Discord</p>
            </div>
            <div
              className={
                "absolute bottom-0 right-2 rounded-full h-20 w-20 -z-20 blur-xl bg-gray-500"
              }
            ></div>
          </a>
          
          <a
            href="/api/login/github"
            className="relative overflow-hidden border rounded-md hover:border-primary/40 transition-all duration-300"
          >
            <div className="bg-card/60 backdrop-blur-3xl p-4 h-full space-y-4">
              <span className="sr-only">Sign-in with Github</span>
              <div>
                <Github size={52} className="mx-auto" />
              </div>
              <p className="font-bold text-center">GitHub</p>
            </div>
            <div
              className={
                "absolute bottom-0 right-2 rounded-full h-20 w-20 -z-20 blur-xl bg-gray-500"
              }
            ></div>
          </a>

          <a
            href="/api/login/mal"
            className="relative overflow-hidden border rounded-md hover:border-primary/40 transition-all duration-300"
          >
            <div className="bg-card/60 backdrop-blur-3xl p-4 h-full space-y-3">
            <span className="sr-only">Sign-in with MyAnimeList</span>
              <div>
                <svg
                  fill="white"
                  role="img"
                  width="52"
                  height="52"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                >
                  <path d="M8.273 7.247v8.423l-2.103-.003v-5.216l-2.03 2.404-1.989-2.458-.02 5.285H.001L0 7.247h2.203l1.865 2.545 2.015-2.546 2.19.001zm8.628 2.069l.025 6.335h-2.365l-.008-2.871h-2.8c.07.499.21 1.266.417 1.779.155.381.298.751.583 1.128l-1.705 1.125c-.349-.636-.622-1.337-.878-2.082a9.296 9.296 0 0 1-.507-2.179c-.085-.75-.097-1.471.107-2.212a3.908 3.908 0 0 1 1.161-1.866c.313-.293.749-.5 1.1-.687.351-.187.743-.264 1.107-.359a7.405 7.405 0 0 1 1.191-.183c.398-.034 1.107-.066 2.39-.028l.545 1.749H14.51c-.593.008-.878.001-1.341.209a2.236 2.236 0 0 0-1.278 1.92l2.663.033.038-1.81h2.309zm3.992-2.099v6.627l3.107.032-.43 1.775h-4.807V7.187l2.13.03z" />
                </svg>
              </div>
              <p className="font-bold text-center">MyAnimeList</p>
            </div>
            <div
              className={
                "absolute bottom-0 right-2 rounded-full h-20 w-20 -z-20 blur-xl bg-gray-500"
              }
            ></div>
          </a>

        </div>
      </section>
    </main>
  );
}
