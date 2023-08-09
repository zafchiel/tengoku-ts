"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import axios from "axios"
import { ProgressType } from "./progressSection"
import { useToast } from "../ui/use-toast"
import { Dispatch } from "react"
import type { SetStateAction } from "react"
import { useRouter } from "next/navigation"

type Props = {
  record: ProgressType
  setProgressArray: Dispatch<SetStateAction<ProgressType[]>>
}

export default function FormComponment({ record, setProgressArray }: Props) {
  const { toast } = useToast()
  const router = useRouter()

  const formSchema = z.object({
    status: z.string(),
    score: z.coerce
      .number({
        required_error: "Score is required",
        invalid_type_error: "Score must be a number",
      })
      .min(0)
      .max(10)
      .optional(),
    progress: z.coerce
      .number()
      .min(0)
      .max(record.anime?.totalEpisodes!),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: record.status,
      score: record.score!,
      progress: record.progress!,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axios.post("/api/anime/updateProgress", {
        ...values,
        recordId: record.id,
      })
      setProgressArray((prev) => {
        const foundIndex = prev.findIndex((el) => el.id === data.id)
        const newState = [...prev]
        newState[foundIndex].status = data.status
        newState[foundIndex].score = data.score
        newState[foundIndex].progress = data.progress
        return newState
      })
      toast({
        description: "Your progress has been saved",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong, try again later",
      })
    }
  }

  const handleDeleteProgress = async () => {
    try {
      const { data } = await axios.post("/api/anime/deleteProgress", {
        recordId: record.id,
      })
      router.refresh()
      toast({
        description: "Successfully deleted record",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong, try again later",
      })
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    required={false}
                    {...field}
                  />
                </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Form>
      <Button
        variant="destructive"
        onClick={handleDeleteProgress}
        className="w-full mt-2"
      >
        Delete
      </Button>
    </>
  )
}
