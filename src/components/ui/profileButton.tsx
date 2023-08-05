import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "./button"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import Link from "next/link"
import { Skeleton } from "./skeleton"

export default function ProfileButton() {
  const { data: session, status } = useSession()

  if (status === "loading") return <Skeleton className="w-14 h-full" />

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
        <Button size="sm" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    )
  }
  return (
    <div>
      <Button size="sm" onClick={() => signIn()}>
        Sign in
      </Button>
    </div>
  )
}
