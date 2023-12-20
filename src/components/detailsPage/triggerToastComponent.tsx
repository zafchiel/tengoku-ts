"use client";

import { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { useSearchParams } from "next/navigation";

export default function TriggerToastComponent() {
  const { toast } = useToast();
  const params = useSearchParams();

  useEffect(() => {
    if (params?.get("notFound"))
      toast({
        title: "Not found any images",
        variant: "destructive",
      });
  }, [params, toast]);

  return null;
}
