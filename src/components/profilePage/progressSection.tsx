"use client"

import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { Session } from "next-auth"
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"
import { AnimesRecord, ProgressRecord } from "@/xata/xata"
import EditSheet from "./editSheet"
import FormComponment from "./form"

export type ProgressType = ProgressRecord & {
  anime: AnimesRecord["title" | "totalEpisodes" | "image"]
}

type Props = {
  user: Session["user"]
}

export default function ProgressSection({ user }: Props) {
  const [progressArray, setProgressArray] = useState<ProgressType[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id) return
      try {
        const { data } = await axios.post("/api/user/getProgress", {
          user_id: user.id,
        })
        setProgressArray(data)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        })
      }
    }

    fetchProgress()
  }, [user, toast])

  return (
    <div className="flex flex-col gap-5 md:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {progressArray.map((record) => (
        <div
          key={record.id}
          className="grid grid-cols-2 gap-2 w-full h-full border rounded-sm p-2"
        >
          <div>
            {record.anime?.image && (
              <Image
                src={record.anime.image}
                width={400}
                height={500}
                alt="Anime Image"
              />
            )}
          </div>
          <div className="flex flex-col justify-between">
            <Link href={`/${record.anime?.id}`} className="font-semibold">
              {record.anime?.title}
            </Link>
            <div className="flex flex-col">
              <p className="text-sm w-24">
                Progress: {record.progress}/{record.anime?.totalEpisodes}
              </p>
            </div>
          </div>
          <EditSheet title={record.anime?.title!}>
            <div className="flex flex-col w-full">
              <FormComponment
                record={record}
                setProgressArray={setProgressArray}
              />

              {record.anime?.image && (
                <Image
                  src={record.anime?.image!}
                  width={400}
                  height={500}
                  alt="Anime image"
                  className="mt-3 h-full rounded-sm"
                />
              )}
            </div>
          </EditSheet>
        </div>
      ))}
    </div>
  )
}
