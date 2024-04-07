"use client";

import { useState } from "react";

export default function Description({ paragraph }: { paragraph: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="grow">
        <p>
          {paragraph.slice(0, 100)}
          {paragraph.length > 100 ? "..." : ""}
        </p>
        {paragraph.length > 100 && (
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-muted-foreground"
          >
            show more
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="grow">
      <p>{paragraph}</p>
      <button onClick={() => setIsOpen((prev) => !prev)} className="text-muted-foreground">
        show less
      </button>
    </div>
  );
}
