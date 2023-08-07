import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
  record: any
}

export default function ProgressCard({ record }: Props) {
  return (
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
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm">Edit</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you sure absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
