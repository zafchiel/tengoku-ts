import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  recordId: string;
};

export default function DeleteButton({ recordId }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const handleDeleteProgress = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
            variant="destructive"
            onClick={handleDeleteProgress}
            className="w-full"
          >
            <Loader2
              className={cn("mr-2 h-4 w-4 animate-spin", {
                hidden: !isLoading,
              })}
            />
            Yes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
