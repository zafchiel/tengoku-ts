"use client";

import {Button} from "@/components/ui/button";
import {addAnimeProgress} from "@/lib/server/actions/progress-actions";
import {ProgressRecordType} from "@/lib/server/db/schema";
import {useState} from "react";
import {MessageSquarePlus} from "lucide-react";

type AddToListProps = {
    animeId: number;
    setProgressInfo: (data: ProgressRecordType) => void;
    maxEpisodes: number | null;
}


export default function AddToList({animeId, setProgressInfo, maxEpisodes}: AddToListProps) {
    const [loading, setLoading] = useState(false);
    const clickHandler = async () => {
        setLoading(true);
        const res = await addAnimeProgress(animeId, maxEpisodes);
        if (res.error) {
            console.log(res.error);
        } else if (res.data) {
            setProgressInfo(res.data);
        }

        setLoading(false);
    }

    return (
        <Button
            onClick={clickHandler}
            loading={loading}
            disabled={loading}
            aria-disabled={loading}
            className="capitalize flex gap-2 items-center"
        >
            <MessageSquarePlus />
            Add To List
        </Button>
    )
}