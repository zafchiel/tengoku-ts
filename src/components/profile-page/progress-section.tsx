"use client";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import ProgressCategorySection from "./progress-category-section";
import useProgressRecords from "@/hooks/use-progress-records";

export default function ProgressSection() {
  const { data, error, isLoading } = useProgressRecords();

  if (isLoading)
    return (
      <section className="flex gap-4 flex-wrap">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-[446px] h-[230px]" />
        ))}
      </section>
    );

  if (error)
    return (
      <section>
        <Alert variant="destructive">
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
        <Alert>
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

  // const categories = Array.from(new Set(data.map((entry) => entry.status)));
  const categories = [
    "Watching",
    "Completed",
    "Plan to watch",
    "On-hold",
    "Dropped",
  ];

  const progressEntriesByCategory = categories.map((category) => ({
    category,
    progressEntries: data.filter((entry) => entry.status === category),
  }));

  return (
    <section className="space-y-12 md:border-l-2 md:pl-4">
      {progressEntriesByCategory.map(({ category, progressEntries }) => (
        <ProgressCategorySection
          key={category}
          category={category}
          progressEntries={progressEntries}
        />
      ))}
    </section>
  );
}
