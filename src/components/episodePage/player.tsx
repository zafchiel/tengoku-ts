"use client"

import { useRef, useEffect } from "react"
import Artplayer from "artplayer"
import { type Option } from "artplayer/types/option"

type Props = {
  option: Option
}

export default function Player({ option, ...rest }: Props) {
  const artRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: artRef.current as HTMLDivElement,
    })

    return () => {
      if (art && art.destroy) {
        art.destroy(false)
      }
    }
  }, [])

  return <div ref={artRef} {...rest}></div>
}
