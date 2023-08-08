import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import FormComponment from "./form"
import Image from "next/image"

type Props = {
  record: any
}

export default function EditSheet({ record }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline" className="p-2">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit your progress</SheetTitle>
          <SheetDescription>{record.anime?.title}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col w-full">
          <FormComponment record={record} />
          <Image
            src={record.anime?.image}
            width={400}
            height={500}
            alt="Anime image"
            className="mt-3 w-full rounded-sm"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
