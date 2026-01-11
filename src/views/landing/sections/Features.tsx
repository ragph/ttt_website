import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { SectionHeader } from '../components/SectionHeader';
import { AnimatedSection } from '../components/AnimatedSection';

const features = [
  {
    icon: PublicIcon,
    title: 'Travel Booking',
    description: 'Book flights, hotels, and vacation packages to destinations worldwide with ease.',
    color: '#1b60ff',
  },
  {
    icon: MonetizationOnIcon,
    title: 'Earn While Travelling',
    description: 'Earn ET points with every booking and turn your travels into rewards.',
    color: '#00C18A',
  },
  {
    icon: AccountBalanceWalletIcon,
    title: 'ET Wallet',
    description: 'Store and manage your ET points securely in your digital wallet.',
    color: '#FFD23F',
  },
  {
    icon: ReceiptIcon,
    title: 'Bills Payments',
    description: 'Pay your bills and earn points on everyday expenses.',
    color: '#FF6B6B',
  },
];

export const Features = () => {
  return (
    <Box
      id="features"
      sx={{
        py: { xs: 8, md: 16 },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
          <SectionHeader
            title="Premier Services For Unmatched Journeys"
            subtitle="Discover the powerful features that make earning while traveling easier than ever"
            align="center"
          />
        </AnimatedSection>

        {/* Features Grid */}
        <Grid container spacing={3}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <AnimatedSection
                  animation="scaleUp"
                  duration={0.6}
                  delay={0.1 + index * 0.1}
                >
                  <Card
                    sx={{
                      minHeight: 300,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: "linear-gradient(135deg, #3b82f6, #1e40af)",
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                        }}
                      >
                        <Icon sx={{ fontSize: 40, color: 'secondary.main' }} />
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight:700,
                          mb: 2,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#6B7280',
                          lineHeight: 1.7,
                        }}
                      >
                        {feature.description}
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
