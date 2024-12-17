"use client";

import Image from "next/image";

export default function ProfilePicture({
  src,
}: {
  src: string | null | undefined;
}) {
  if (!src) {
    return null;
  }

  return (
    <Image
      src={src}
      alt="User profile picture"
      className="w-24 h-24 rounded"
      width={96}
      height={96}
    />
  );
}
