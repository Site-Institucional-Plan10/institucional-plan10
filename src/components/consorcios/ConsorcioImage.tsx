import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ConsorcioImageProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export default function ConsorcioImage({
  src,
  alt,
  className = '',
  aspectRatio = '16/10',
}: ConsorcioImageProps) {
  const [errored, setErrored] = useState(!src);
  const [loaded, setLoaded] = useState(false);

  const showFallback = errored || !src;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        background: '#F3F4F6',
        borderRadius: 'inherit',
        overflow: 'hidden',
      }}
    >
      {!showFallback && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 300ms ease',
          }}
        />
      )}
      {showFallback && (
        <div
          aria-label={alt}
          role="img"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #9857F2 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ImageIcon size={32} color="rgba(255,255,255,0.5)" />
        </div>
      )}
    </div>
  );
}
