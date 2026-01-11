import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HotelIcon from '@mui/icons-material/Hotel';
import LuggageIcon from '@mui/icons-material/Luggage';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { SectionHeader } from '../components/SectionHeader';
import { AnimatedSection } from '../components/AnimatedSection';

const offerings = [
  {
    icon: FlightTakeoffIcon,
    title: 'Flight Booking',
    description: 'Local and international flights at competitive prices.',
    color: '#3b82f6',
  },
  {
    icon: HotelIcon,
    title: 'Hotel Booking',
    description: 'Thousands of hotels — budget to luxury.',
    color: '#3b82f6',
  },
  {
    icon: LuggageIcon,
    title: 'Travel Packages',
    description: 'Curated tours and experiences for every traveler.',
    color: '#3b82f6',
  },
  {
    icon: VerifiedUserIcon,
    title: 'Visa & Insurance',
    description: 'Smooth visa support and reliable travel insurance.',
    color: '#3b82f6',
  },
];

export const WhatWeOffer = () => {
  return (
    <Box
      id="what-we-offer"
      sx={{
        py: { xs: 8, md: 16 },
        bgcolor: '#f8fafc',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
          <SectionHeader
            title="What We Offer"
            subtitle=""
            align="center"
          />
        </AnimatedSection>

        {/* Offerings Grid */}
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {offerings.map((offering, index) => {
            const Icon = offering.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <AnimatedSection
                  animation="scaleUp"
                  duration={0.6}
                  delay={0.1 + index * 0.1}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      border: 'none',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 4,
                        textAlign: 'center',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: '#002d73',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                        }}
                      >
                        <Icon sx={{ fontSize: 40, color: 'success.main' }} />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: '#1e293b',
                        }}
                      >
                        {offering.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#64748b',
                          lineHeight: 1.7,
                        }}
                      >
                        {offering.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};
