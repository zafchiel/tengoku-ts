"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type PosterImageProps = {
  src: string;
  alt: string;
  imgBase64: string | undefined;
};

export const PosterImage = ({ src, alt, imgBase64 }: PosterImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0, image.width, image.height);
  };

  return (
    <div className="relative overflow-hidden md:overflow-visible">
      <Image
        ref={imageRef}
        src={src}
        placeholder={imgBase64 ? "blur" : "empty"}
        blurDataURL={imgBase64}
        width={400}
        height={550}
        alt={alt}
        onLoad={drawCanvas}
        className="md:static aspect-[4/5.5] fixed inset-0 h-screen w-full -z-20 object-cover md:rounded-sm md:w-[400px] md:h-auto"
      />
      <canvas
        ref={canvasRef}
        width={400}
        height={550}
        className="absolute aspect-[4/5.5] inset-0 pointer-events-none scale-105 blur-xl -z-30 opacity-40"
      />
    </div>
  );
};
