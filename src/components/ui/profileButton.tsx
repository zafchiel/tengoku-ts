import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";

export default function ProfileButton() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <div className="flex gap-2">
        <Link href={`/user/${session.user?.name}`}>
          <Avatar>
            {session.user?.image && (
              <AvatarImage src={session.user?.image} alt="Profile image" />
            )}
            <AvatarFallback>{session.user?.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Link>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div>
      <Button variant="secondary" size="sm" onClick={() => signIn()}>
        Sign in
      </Button>
    </div>
  );
}
