import { useRef } from 'react';
import s from '../styles.module.css';

interface HeroThumbnailProps {
  src: string;
  alt: string;
}

export default function HeroThumbnail({
  src,
  alt,
}: HeroThumbnailProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const handleLoad = () => {
    const img = imgRef.current as HTMLImageElement;
    const fallback = fallbackRef.current as HTMLDivElement;

    fallback.classList.add(s.hide);
    img.classList.add(s.show);
  };

  return (
    <>
      <img
        loading="lazy"
        ref={imgRef}
        onLoad={handleLoad}
        className={s['hero-thumbnail']}
        src={src}
        alt={alt}
      />
      <div
        ref={fallbackRef}
        className={s['thumbnail-fallback']}
      ></div>
    </>
  );
}
