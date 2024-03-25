import { useEffect, useRef } from 'react';
import Image from 'next/image';

type PosterImageProps = {
    src: string;
    alt: string;
    imgBase64: string;
}

export const PosterImage = ({ src, alt, imgBase64 }: PosterImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if(!canvas || !image) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawCanvas = () => {
        canvas.width = image.width;
        canvas.height = image.height;
    
        ctx.drawImage(image, 0, 0, image.width, image.height);
    }

    image.addEventListener('load', drawCanvas);

    return () => {
        image.removeEventListener('load', drawCanvas);
    }
  }, []);

  return (
    <div className='relative overflow-hidden md:overflow-visible'>
        <Image
              ref={imageRef}
              src={src}
              placeholder="blur"
              blurDataURL={imgBase64}
              width={400}
              height={500}
              alt={alt}
              className="md:static fixed inset-0 h-screen w-full -z-20 object-cover md:rounded-sm md:w-[400px] md:h-auto"
            />
        <canvas ref={canvasRef} width={400} height={500} className='absolute inset-0 pointer-events-none scale-105 blur-xl -z-30 opacity-60' />
    </div>
  );
};