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

export default function EditSheet() {
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
          <SheetDescription>:3</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col w-full">
          <FormComponment />
        </div>
      </SheetContent>
    </Sheet>
  );
}
