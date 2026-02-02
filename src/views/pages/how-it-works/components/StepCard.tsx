import { useRef, useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export const StepCard = ({ stepNumber, title, description, isLast = false }: StepCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={cardRef}
      sx={{
        display: 'flex',
        gap: { xs: 2, sm: 3 },
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${stepNumber * 0.1}s`,
      }}
    >
      {/* Timeline Column */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 0.5,
        }}
      >
        {/* Step Number Circle */}
        <Box
          sx={{
            width: { xs: 44, sm: 52 },
            height: { xs: 44, sm: 52 },
            minWidth: { xs: 44, sm: 52 },
            borderRadius: '50%',
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            boxShadow: '0 4px 14px rgba(30, 64, 175, 0.3)',
            position: 'relative',
            zIndex: 2,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: '0 6px 20px rgba(30, 64, 175, 0.4)',
            },
          }}
        >
          {stepNumber}
        </Box>

        {/* Connecting Line */}
        {!isLast && (
          <Box
            sx={{
              width: 2,
              flex: 1,
              minHeight: 40,
              bgcolor: 'divider',
              mt: 1,
            }}
          />
        )}
      </Box>

      {/* Content Card */}
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          p: { xs: 2.5, sm: 3 },
          mb: isLast ? 0 : 2,
          borderRadius: 3,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: 'primary.light',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            transform: 'translateY(-2px)',
            '& .step-accent': {
              width: 6,
            },
          },
        }}
      >
        {/* Left Accent Bar */}
        {/* <Box
          className="step-accent"
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            bgcolor: 'primary.main',
            borderRadius: '3px 0 0 3px',
            transition: 'width 0.3s ease',
          }}
        /> */}

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 1,
            fontSize: { xs: '1.05rem', sm: '1.2rem' },
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.7,
            fontSize: { xs: '0.875rem', sm: '0.95rem' },
          }}
        >
          {description}
        </Typography>
      </Paper>
    </Box>
  );
};
