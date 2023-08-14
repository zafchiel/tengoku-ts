import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  recordId: string;
};

export default function DeleteButton({ recordId }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const handleDeleteProgress = async () => {
    try {
      const { data } = await axios.delete("/api/anime/deleteProgress", {
        data: {
          recordId,
        },
      });
      router.refresh();
      toast({
        description: "Successfully deleted record",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong, try again later",
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="w-full mt-2">
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex gap-2 justify-center items-center">
          <h4>Are you sure?</h4>
          <Button
            variant="destructive"
            onClick={handleDeleteProgress}
            className="w-full"
          >
            Yes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
