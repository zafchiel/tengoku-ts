import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import FormComponment from "./form";
import Image from "next/image";
import { getXataClient } from "@/xata/xata";

type Props = {
  record: any;
};

export default async function EditSheet({ record }: Props) {
  const handleDeleteProgress = async () => {
    const xata = getXataClient();
    await xata.db.progress.delete(record.id);
  };

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
          <Button
            variant="destructive"
            onClick={handleDeleteProgress}
            className="w-full"
          >
            Delete
          </Button>
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
  );
}
