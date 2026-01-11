import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';

export const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollAmountRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&h=500&fit=crop',
      alt: 'Airplane wing sunset',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=500&fit=crop',
      alt: 'Airplane over clouds',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
      alt: 'Mountain lake',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop',
      alt: 'Beach paradise',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=500&h=500&fit=crop',
      alt: 'Travel road',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&h=500&fit=crop',
      alt: 'Adventure landscape',
    },
  ];

  useEffect(() => {
    const marqueeScroll = () => {
      if (!isPaused && containerRef.current) {
        scrollAmountRef.current += 1;
        containerRef.current.style.transform = `translateX(-${scrollAmountRef.current}px)`;

        // Reset when half of the content is scrolled
        if (scrollAmountRef.current >= (containerRef.current.scrollWidth / 2)) {
          scrollAmountRef.current = 0;
        }
      }
      animationFrameRef.current = requestAnimationFrame(marqueeScroll);
    };

    animationFrameRef.current = requestAnimationFrame(marqueeScroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused]);

  return (
    <Box
      id="gallery"
      sx={{
        py: { xs: 6, md: 12 },
        overflow: 'hidden',
      }}
    >
      {/* Section Title */}
      <SectionHeader
        title="Travel Gallery"
        subtitle="Explore breathtaking destinations around the world"
        align="center"
      />

      {/* Marquee Wrapper */}
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Box
          ref={containerRef}
          sx={{
            display: 'flex',
            willChange: 'transform',
          }}
        >
          {/* Original Images */}
          {galleryImages.map((image) => (
            <Box
              key={`original-${image.id}`}
              sx={{
                flexShrink: 0,
                marginRight: { xs: '16px', sm: '24px', md: '30px' },
                width: { xs: '250px', sm: 'clamp(280px, 20vw, 500px)', md: 'clamp(300px, 20vw, 500px)' },
                aspectRatio: '1/1',
                overflow: 'hidden',
                borderRadius: 3,
                '& img': {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'all 0.5s ease',
                },
                '&:hover img': {
                  transform: 'scale(1.1) rotate(3deg)',
                  filter: 'brightness(70%)',
                },
              }}
            >
              <img src={image.src} alt={image.alt} />
            </Box>
          ))}

          {/* Cloned Images for seamless loop */}
          {galleryImages.map((image) => (
            <Box
              key={`clone-${image.id}`}
              sx={{
                flexShrink: 0,
                marginRight: { xs: '16px', sm: '24px', md: '30px' },
                width: { xs: '250px', sm: 'clamp(280px, 20vw, 500px)', md: 'clamp(300px, 20vw, 500px)' },
                aspectRatio: '1/1',
                overflow: 'hidden',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '& img': {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'all 0.5s ease',
                },
                '&:hover img': {
                  transform: 'scale(1.1) rotate(3deg)',
                  filter: 'brightness(70%)',
                },
              }}
            >
              <img src={image.src} alt={image.alt} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
