import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SectionNav } from './components/SectionNav';
import { StepperSection } from './components/StepperSection';
import { howItWorksSections } from './data/howItWorksSteps';

const HowItWorksPage = () => {
  const [activeSection, setActiveSection] = useState(howItWorksSections[0]?.id || '');

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = howItWorksSections.map((section) =>
        document.getElementById(section.id)
      );

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(howItWorksSections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFirstSection = () => {
    const firstSection = document.getElementById(howItWorksSections[0]?.id);
    if (firstSection) {
      const offset = 100;
      const elementPosition = firstSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Vertical Sticky Side Navigation */}
      <SectionNav
        sections={howItWorksSections}
        activeSection={activeSection}
      />

      {/* Hero Banner */}
      <Box
        sx={{
          bgcolor: '#1e40af',
          color: 'white',
          py: { xs: 8, md: 10 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            How It Works
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.95,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Master your wallet in minutes. Learn how to top up, withdraw funds,
            and convert currencies with our easy-to-follow guides.
          </Typography>
        </Container>
      </Box>

      {/* Content Sections */}
      {howItWorksSections.map((section, index) => (
        <StepperSection key={section.id} section={section} index={index} />
      ))}

      {/* Bottom CTA Section */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          bgcolor: 'primary.main',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(30, 64, 175, 0.15) 0%, transparent 60%)
            `,
          }}
        />

        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: 'white',
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              letterSpacing: '-0.02em',
            }}
          >
            Ready to get started?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              mb: 4,
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            Open your wallet now and try these steps yourself.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/app/dashboard"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              bgcolor: 'white',
              color: '#0f172a',
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Let's Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HowItWorksPage;
