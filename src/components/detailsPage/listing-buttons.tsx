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
import {useContext} from "react";
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

console.log(SCORES)

export default function ListingButtons() {
    const { userInfo, isAuthenticating } = useContext(UserInfoContext);

    if (isAuthenticating) {
        return <Skeleton className="w-[200px]" />
    }

    return (
        <div className="flex gap-3">
            <Button>
                Add to list
            </Button>

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