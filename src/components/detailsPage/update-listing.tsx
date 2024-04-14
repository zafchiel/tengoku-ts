"use client";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {Save} from "lucide-react";
import {updateAnimeProgress} from "@/lib/server/actions/progress-actions";
import {WATCHING_STATUSES} from "@/lib/server/db/schema";

const SCORES = [
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
] as const

type UpdateListingProps = {
    animeId: number;
}

export default function UpdateListing({ animeId }: UpdateListingProps) {

    return (
        <form
            action={async (formData) => {
                formData.append("animeId", animeId.toString());
                await updateAnimeProgress(formData);
             }}
            className="flex gap-3"
        >
            <Select name="status">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="PTW"/>
                </SelectTrigger>
                <SelectContent>
                    {WATCHING_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select name="score">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Score"/>
                </SelectTrigger>
                <SelectContent>
                    {SCORES.map(([score, name]) => (
                        <SelectItem value={score.toString()}>{`${score} - ${name}`}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="icon" variant="default" type="submit">
                            <Save/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Save
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </form>
    )
}