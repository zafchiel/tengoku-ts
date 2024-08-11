import { validateRequest } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import { OAuthLink } from "@/components/loginPage/oauth-link";
import { DiscordIcon } from "@/components/loginPage/icons/discord-icon";
import { GoogleIcon } from "@/components/loginPage/icons/google-icon";
import { MalIcon } from "@/components/loginPage/icons/mal-icon";
import { GithubIcon } from "@/components/loginPage/icons/github-icon";

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
						Sign In
					</h1>
					<p className="text-muted-foreground leading-none mb-4">
						choose your favorite provider
					</p>
				</header>
				<div className="flex flex-col md:grid grid-cols-2 gap-4 max-w-xl">
					<OAuthLink providerName="google" icon={GoogleIcon} />
					<OAuthLink providerName="discord" icon={DiscordIcon} />

					{/* You can pass component reference with default props */}
					<OAuthLink providerName="github" icon={GithubIcon} />

					{/* Passing function to modify default props */}
					<OAuthLink
						providerName="MyAnimeList"
						providerLink="mal"
						icon={(props) => <MalIcon className="mx-auto" {...props} />}
					/>
				</div>
			</section>
		</main>
	);
}
