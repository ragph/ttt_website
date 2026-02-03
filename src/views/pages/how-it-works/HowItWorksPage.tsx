import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SectionNav } from './components/SectionNav';
import { StepperSection } from './components/StepperSection';
import { howItWorksSections } from './data/howItWorksSteps';

const HowItWorksPage = () => {
  const [activeSection, setActiveSection] = useState(howItWorksSections[0]?.id || '');

  // Update meta tags for SEO and social sharing
  useEffect(() => {
    const originalTitle = document.title;
    const hash = window.location.hash.slice(1);
    const section = howItWorksSections.find(s => s.id === hash);

    const title = section
      ? `${section.title} | How It Works | Trip Travel & Tours`
      : 'How It Works | Trip Travel & Tours';
    const description = section
      ? section.description
      : 'Master your credits in minutes. Learn how to top up, payout funds, and convert currencies with our easy-to-follow guides.';
    const currentUrl = window.location.href;
    const image = 'https://triptravelandtours.com/og-how-it-works.jpg';

    // Update document title
    document.title = title;

    // Helper to set or create meta tag
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', description);

    // Open Graph meta tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:url', currentUrl, true);
    setMetaTag('og:type', 'website', true);

    // Twitter Card meta tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);

    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      // Small delay to ensure the page has rendered
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth',
          });
          setActiveSection(hash);
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, []);

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
          pt: { xs: 8, md: 10 },
          pb: { xs: 4, md: 6 },
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
              mb: { xs: 4, md: 6 },
            }}
          >
            Learn how to manage and use your prepaid credits to use in-app services, payout your rewards with our easy-to-follow guides.
          </Typography>

          {/* Dashboard Preview Phone Mockup */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 280, sm: 320, md: 360 },
              }}
            >
              {/* Phone Frame */}
              <Box
                sx={{
                  p: '10px',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* Screen */}
                <Box
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {/* Dashboard Screenshot */}
                  <Box
                    component="img"
                    src="/images/et-dashboard.png"
                    alt="ET Dashboard"
                    sx={{
                      width: '100%',
                      display: 'block',
                    }}
                  />
                </Box>
              </Box>

              {/* Decorative glow */}
              {/* <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120%',
                  height: '120%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              /> */}
            </Box>
          </Box>

          {/* Scroll Down Indicator */}
          <Box
            onClick={scrollToFirstSection}
            sx={{
              mt: { xs: 4, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 52,
                borderRadius: '16px',
                border: '2px solid rgba(255,255,255,0.5)',
                display: 'flex',
                justifyContent: 'center',
                pt: 1,
                position: 'relative',
              }}
            >
              {/* Animated scroll dot */}
              <Box
                sx={{
                  width: 6,
                  height: 10,
                  borderRadius: '3px',
                  bgcolor: 'white',
                  animation: 'scrollBounce 2s ease-in-out infinite',
                  '@keyframes scrollBounce': {
                    '0%, 100%': {
                      transform: 'translateY(0)',
                      opacity: 1,
                    },
                    '50%': {
                      transform: 'translateY(16px)',
                      opacity: 0.3,
                    },
                  },
                }}
              />
            </Box>
            <Typography
              variant="caption"
              sx={{
                mt: 1.5,
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Scroll to explore
            </Typography>
            <KeyboardArrowDownIcon
              sx={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 20,
                mt: 0.5,
                animation: 'arrowBounce 1.5s ease-in-out infinite',
                '@keyframes arrowBounce': {
                  '0%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '50%': {
                    transform: 'translateY(4px)',
                  },
                },
              }}
            />
          </Box>
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
            Open your credits now and try these steps yourself.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="https://etapp.triptravelandtours.com/register"
            rel="noopener noreferrer"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              bgcolor: 'white',
              color: '#1e40af',
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Create Your Account
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HowItWorksPage;
