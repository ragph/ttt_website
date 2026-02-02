import { useRef, useEffect, useState } from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { StepCard } from './StepCard';
import type { Section } from '../data/howItWorksSteps';

const sectionIcons: Record<string, typeof AccountBalanceWalletIcon> = {
  topup: AccountBalanceWalletIcon,
  payout: PaymentsIcon,
  convert: CurrencyExchangeIcon,
};

const sectionColors: Record<string, string> = {
  topup: '#1e40af',
  payout: '#059669',
  convert: '#7c3aed',
};

interface StepperSectionProps {
  section: Section;
  index: number;
}

export const StepperSection = ({ section, index }: StepperSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const Icon = sectionIcons[section.id] || AccountBalanceWalletIcon;
  const accentColor = sectionColors[section.id] || '#1e40af';
  const isEven = index % 2 === 0;

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = Math.max(0, Math.min(1, scrollProgress)) * 30;
        setParallaxOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      id={section.id}
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: isEven ? 'background.default' : 'background.paper',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Background Elements */}
      {/* <Box
        sx={{
          position: 'absolute',
          top: -100 + parallaxOffset,
          right: isEven ? -150 : 'auto',
          left: isEven ? 'auto' : -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          bgcolor: accentColor,
          opacity: 0.03,
          transition: 'top 0.1s linear',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50 - parallaxOffset * 0.5,
          right: isEven ? 'auto' : -100,
          left: isEven ? -100 : 'auto',
          width: 250,
          height: 250,
          borderRadius: '50%',
          bgcolor: accentColor,
          opacity: 0.02,
          transition: 'bottom 0.1s linear',
          pointerEvents: 'none',
        }}
      /> */}

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: { xs: 4, lg: 8 },
            // alignItems: { xs: 'center', lg: 'flex-start' },
            // justifyContent: { xs: 'center', lg: 'space-between' },
          }}
        >
          {/* Section Header - Sticky on Desktop, Centered on Mobile */}
          <Box
            sx={{
              flex: { lg: '0 0 320px' },
              position: { lg: 'sticky' },
              top: { lg: 140 },
              order: { xs: 0, lg: isEven ? 0 : 1 },
              textAlign: { xs: 'center', lg: 'left' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', lg: 'flex-start' },
            }}
          >
            {/* Icon Badge */}
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 3,
                bgcolor: accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                boxShadow: `0 8px 24px ${accentColor}33`,
              }}
            >
              <Icon sx={{ fontSize: 36, color: 'white' }} />
            </Box>

            {/* Section Number Chip */}
            <Chip
              label={`Section ${index + 1}`}
              size="small"
              sx={{
                mb: 2,
                bgcolor: `${accentColor}15`,
                color: accentColor,
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {section.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              {section.subtitle}
            </Typography>

            {/* Step Count Indicator */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', lg: 'flex-start' },
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 0.5,
                }}
              >
                {section.steps.map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: accentColor,
                      opacity: 0.3 + (i + 1) * (0.7 / section.steps.length),
                    }}
                  />
                ))}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                {section.steps.length} steps
              </Typography>
            </Box>
          </Box>

          {/* Steps Timeline */}
          <Box
            sx={{
              flex: 1,
              order: { xs: 1, lg: isEven ? 1 : 0 },
            }}
          >
            {section.steps.map((step, stepIndex) => (
              <StepCard
                key={step.id}
                stepNumber={stepIndex + 1}
                title={step.title}
                description={step.description}
                isLast={stepIndex === section.steps.length - 1}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
