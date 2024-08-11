import { deleteAnimeProgressEntry, markSeriesAsCompleted } from "@/lib/server/actions/progress-actions";
import type { ProgressRecordType } from "@/lib/server/db/schema";
import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";


const fetcher = (url: string) =>
	axios.get<ProgressRecordType[]>(url).then((res) => res.data);

export default function useProgressRecords() {
  const { data, isLoading, error, mutate } = useSWR('/api/user/progress', fetcher)

  // Function to delete a progress entry
  async function deleteProgressEntryAction (url: string, { arg }: { arg: { progressId: number}}) {
    // Call the deleteAnimeProgressEntry zod-server-action with the progress ID
    const [data, error] = await deleteAnimeProgressEntry(arg.progressId);

    // If there's an error, throw it
    if (error) {
      throw new Error(error.data);
    }

    return data;
  };

  // Use SWR mutation hook for deleting progress entry pending state
  const { trigger: deleteProgressEntry, isMutating } = useSWRMutation(
    "/api/user/progress",
    deleteProgressEntryAction,
    {
      // On successful deletion
      onSuccess: () => {
        toast.success("Progress entry deleted successfully");
      },
      // On error during deletion
      onError: () => {
        toast.error("An error occurred. Please try again.");
      },
    }
  );

  return {
    data,
    isLoading,
    error,
    mutate,
    deleteProgressEntry,
    isMutating
  }
}