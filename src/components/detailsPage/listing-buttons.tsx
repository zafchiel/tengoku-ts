"use client";

import axios from "axios";
import {UserInfoContext} from "@/components/providers/user-info-provider";
import {useContext, useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import AddToList from "@/components/detailsPage/add-to-list";
import {ProgressRecordType} from "@/lib/server/db/schema";
import UpdateListing from "@/components/detailsPage/update-listing";

type ListingButtonsProps = {
    animeId: number;
    maxEpisodes: number | null;
}

export default function ListingButtons({animeId, maxEpisodes}: ListingButtonsProps) {
    const {userInfo, isAuthenticating} = useContext(UserInfoContext);
    const [loadingProgress, setLoadingProgress] = useState(true);
    const [progressInfo, setProgressInfo] = useState<ProgressRecordType | null>(null)

    useEffect(() => {
        const fetchProgress = async (id: number) => {
            try {
                const response = await axios.get<ProgressRecordType>("/api/anime", {
                    params: {
                        id
                    }
                })

                setProgressInfo(response.data)
            } catch (e) {
                // console.log(e)
            } finally {
                setLoadingProgress(false);
            }
        }

        fetchProgress(animeId);
    }, [animeId]);

    if (isAuthenticating || loadingProgress) {
        return <Skeleton className="w-[200px] h-14"/>
    }

    if (progressInfo === null && !loadingProgress) {
        return (
            <AddToList
                animeId={animeId}
                setProgressInfo={(data) => setProgressInfo(data)}
                maxEpisodes={maxEpisodes}
            />
        )
    }

    if (progressInfo !== null && userInfo) {
        return (
            <UpdateListing progressInfo={progressInfo}/>
        )
    }
}