import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { SectionHeader } from '../components/SectionHeader';
import { AnimatedSection } from '../components/AnimatedSection';

const reasons = [
  {
    icon: FlightIcon,
    stat: '900+',
    title: 'Partner Airlines',
    description: 'Partnered with 900+ airlines worldwide, giving you access to the best routes and fares across the globe.',
    accent: '#3b82f6',
  },
  {
    icon: HotelIcon,
    stat: '800,000+ and 50,000+',
    title: 'Discounted Hotels',
    description: 'Over 800,000+ hotels and 50,000+ hotels with discounted package rates so you can enjoy premium stays at unbeatable prices.',
    accent: '#f59e0b',
  },
  {
    icon: TravelExploreIcon,
    stat: '50+',
    title: 'Countries Covered',
    description: 'Sightseeing in over 50 countries around the world with curated tours and unforgettable experiences.',
    accent: '#10b981',
  },
  {
    icon: HandshakeIcon,
    stat: '#1',
    title: 'Travel Tech Partner',
    description: "In partnership with the world's leading travel technology provider for seamless and reliable booking.",
    accent: '#8b5cf6',
  },
];

export const WhyChooseUs = () => {
  return (
    <Box
      id="why-choose-us"
      sx={{
        py: { xs: 8, md: 16 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #001d4a 0%, #002d73 50%, #003d8f 100%)',
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,210,63,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
          <SectionHeader
            badge="WHY CHOOSE US"
            badgeColor="#FFD23F"
            title="Your Trusted Travel Partner"
            subtitle="We bring together the best airlines, hotels, and experiences to make every journey seamless and unforgettable."
            align="center"
            titleColor="#ffffff"
            subtitleColor="rgba(255,255,255,0.7)"
          />
        </AnimatedSection>

        {/* Cards Grid */}
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
                <AnimatedSection
                  animation="fadeUp"
                  duration={0.6}
                  delay={0.1 + index * 0.12}
                >
                  <Card
                    sx={{
                      height: { xs: '100%', md: 520 },
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      overflow: 'hidden',
                      boxShadow: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.08)',
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 3, md: 4 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 3,
                          background: `linear-gradient(135deg, ${reason.accent}20, ${reason.accent}10)`,
                          border: `1px solid ${reason.accent}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                          transition: 'all 0.3s ease',
                          flexShrink: 0,
                        }}
                      >
                        <Icon sx={{ fontSize: 32, color: reason.accent }} />
                      </Box>

                      {/* Stat Number */}
                      <Box
                        sx={{
                          minHeight: { xs: 40, md: 48 },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1.5,
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight: 900,
                            color: '#FFD23F',
                            fontSize: { xs: '1.5rem', md: '2.2rem' },
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {reason.stat}
                        </Typography>
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: '#ffffff',
                          mb: 2,
                          fontSize: { xs: '1.25rem', md: '1.5rem' },
                        }}
                      >
                        {reason.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          lineHeight: 1.8,
                          fontSize: '0.95rem',
                        }}
                      >
                        {reason.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </Grid>
            );
          })}
        </Grid>

        {/* Bottom trust bar */}
        <AnimatedSection animation="fadeUp" duration={0.8} delay={0.6}>
          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              pt: { xs: 4, md: 5 },
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 2, md: 6 },
            }}
          >
            {[
              { value: '10K+', label: 'Happy Travelers' },
              { value: '24/7', label: 'Customer Support' },
              { value: '99.9%', label: 'Uptime Guarantee' },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: '#FFD23F' }}
                >
                  {item.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
};
