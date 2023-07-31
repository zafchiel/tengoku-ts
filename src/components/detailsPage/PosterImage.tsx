'use client'

import Image from "next/image"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"

type Props = {
    src: string
}

export default function PosterImage({src}: Props) {
    const [isLoaded, setIsLoaded] = useState(false)
  
    
    return (<div>
        {isLoaded ? <Image width={400} height={500} src={src} alt="Poster Image" onLoadingComplete={(img) => setIsLoaded(true)} /> : <Skeleton className="w-80 h-80" />}
    </div>)
}