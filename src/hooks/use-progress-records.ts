import type { ProgressRecordType } from "@/lib/server/db/schema";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) =>
	axios.get<ProgressRecordType[]>(url).then((res) => res.data);

export default function useProgressRecords() {
  const { data, isLoading, error, mutate } = useSWR('/api/user/progress', fetcher)

  return {
    data,
    isLoading,
    error,
    mutate
  }
}