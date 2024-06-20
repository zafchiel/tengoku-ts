"use client";

import { ProgressRecordType } from "@/lib/server/db/schema";
import axios from "axios";
import useSWR from "swr";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import EditSeriesProgressCard from "@/components/profile-page/edit-series-progress-card";
import { Skeleton } from "../ui/skeleton";

const fetcher = (url: string) =>
  axios.get<ProgressRecordType[]>(url).then((res) => res.data);

export default function ProgressSection() {
  const { data, error, isLoading } = useSWR("/api/user/progress", fetcher);

  if (isLoading)
    return (
      <section className="flex gap-4 flex-wrap">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-80 h-40" />
        ))}
      </section>
    );

  if (error)
    return (
      <section>
        <Alert variant="destructive" className="max-w-xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Something went wrong. Refresh the page or try again later.
          </AlertDescription>
        </Alert>
      </section>
    );

  if (!data || data.length === 0) {
    return (
      <section>
        <Alert className="max-w-xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Progress</AlertTitle>
          <AlertDescription>
            You don&apos;t have any progress entries yet. Start adding some to
            see them here.
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  return (
    <section className="flex gap-4 flex-wrap">
      {data.map((progressInfo) => (
        <EditSeriesProgressCard
          key={progressInfo.id}
          progressInfo={progressInfo}
        />
      ))}
    </section>
  );
}
