"use client"

import { useState } from "react"

export default function Description({ paragraph }: { paragraph: string }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <div className="grow">
        <p>{paragraph.slice(0, 100)}...</p>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="opacity-40"
        >
          show more
        </button>
      </div>
    )
  }
  return (
    <div className="grow">
      <p>{paragraph}</p>
      <button onClick={() => setIsOpen((prev) => !prev)} className="opacity-40">
        show less
      </button>
    </div>
  )
}
