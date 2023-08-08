"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

const formSchema = z.object({
  status: z.string(),
  score: z.number().int().min(1).max(2),
  progress: z.number().int().min(1),
});

export default function FormComponment() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "Watching",
      score: 0,
      progress: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="Watching">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="State of progress" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Watching">Watching</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Mamale</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Score</FormLabel>
              <FormControl>
                <Input
                  placeholder="Score"
                  type="number"
                  min={1}
                  max={10}
                  {...field}
                />
              </FormControl>
              <FormDescription>Yout opinionated score</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="progress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Progress</FormLabel>
              <FormControl>
                <Input
                  placeholder="Progress"
                  type="number"
                  min={0}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                How many episodes have you watched?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
