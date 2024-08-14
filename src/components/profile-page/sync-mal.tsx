import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function SyncMal() {
  return (
    <Link
      href="/api/sync-mal"
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "my-4 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
      )}
    >
      Sync MyAnimeList
    </Link>
  );
}
