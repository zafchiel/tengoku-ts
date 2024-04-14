"use client";

import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import {UserInfoContext} from "@/components/providers/user-info-provider";
import {useContext, useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

const SCORES = Object.fromEntries([
    [10, 'Masterpiece'],
    [9, 'Great'],
    [8, 'Very Good'],
    [7, 'Good'],
    [6, 'Fine'],
    [5, 'Average'],
    [4, 'Bad'],
    [3, 'Very Bad'],
    [2, 'Horrible'],
    [1, 'Appaling'],
    [0, 'None']
])


type ListingButtonsProps = {
    animeId: number;
}

export default function ListingButtons({ animeId }: ListingButtonsProps) {
    const { userInfo, isAuthenticating } = useContext(UserInfoContext);
    const [loadingProgress, setLoadingProgress] = useState(true);
    const [progressInfo, setProgressInfo] = useState(null)

    useEffect(() => {
        const fetchProgress = async (id: number) => {
            try {
                const response = await axios.get("/api/anime", {
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
    }, []);

    if (isAuthenticating || loadingProgress) {
        return <Skeleton className="w-[200px]" />
    }

    if (progressInfo === null && !loadingProgress) {
        return (
            <Button>
                Add to list
            </Button>
        )
    }

    return (
        <div className="flex gap-3">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="PTW" />
                </SelectTrigger>
                <SelectContent>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Score" />
                </SelectTrigger>
                <SelectContent>
                </SelectContent>
            </Select>
        </div>
    )
}