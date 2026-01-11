import { useEffect, useRef, useState, ReactNode } from 'react';
import { Box } from '@mui/material';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleUp';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export const AnimatedSection = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  triggerOnce = true,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, triggerOnce]);

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
      transitionDelay: `${delay}s`,
    };

    const hiddenStyles: Record<string, any> = {
      fadeUp: {
        opacity: 0,
        transform: 'translateY(60px)',
      },
      fadeIn: {
        opacity: 0,
      },
      fadeLeft: {
        opacity: 0,
        transform: 'translateX(-60px)',
      },
      fadeRight: {
        opacity: 0,
        transform: 'translateX(60px)',
      },
      scaleUp: {
        opacity: 0,
        transform: 'scale(0.9)',
      },
    };

    const visibleStyles: Record<string, any> = {
      fadeUp: {
        opacity: 1,
        transform: 'translateY(0)',
      },
      fadeIn: {
        opacity: 1,
      },
      fadeLeft: {
        opacity: 1,
        transform: 'translateX(0)',
      },
      fadeRight: {
        opacity: 1,
        transform: 'translateX(0)',
      },
      scaleUp: {
        opacity: 1,
        transform: 'scale(1)',
      },
    };

    return {
      ...baseStyles,
      ...(isVisible ? visibleStyles[animation] : hiddenStyles[animation]),
    };
  };

  return (
    <Box ref={sectionRef} sx={getAnimationStyles()}>
      {children}
    </Box>
  );
};

// Variant for staggered animations (children appear one after another)
interface StaggeredAnimationProps {
  children: ReactNode[];
  animation?: 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleUp';
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  threshold?: number;
}

export const StaggeredAnimation = ({
  children,
  animation = 'fadeUp',
  staggerDelay = 0.1,
  baseDelay = 0,
  duration = 0.8,
  threshold = 0.1,
}: StaggeredAnimationProps) => {
  return (
    <>
      {children.map((child, index) => (
        <AnimatedSection
          key={index}
          animation={animation}
          delay={baseDelay + index * staggerDelay}
          duration={duration}
          threshold={threshold}
        >
          {child}
        </AnimatedSection>
      ))}
    </>
  );
};
