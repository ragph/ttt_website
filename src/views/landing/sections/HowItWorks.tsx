import { Box, Container, Typography, Grid } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { SectionHeader } from '../components/SectionHeader';
import { AnimatedSection } from '../components/AnimatedSection';

const steps = [
  {
    icon: PersonAddIcon,
    title: 'Sign Up',
    description: 'Create your account for free in minutes',
    step: 1,
  },
  {
    icon: SearchIcon,
    title: 'Book Your Trip',
    description: 'Choose flights, hotels, or travel packages',
    step: 2,
  },
  {
    icon: AccountBalanceWalletIcon,
    title: 'Earn Rewards',
    description: 'Cashback and points go to your ET credits',
    step: 3,
  },
  {
    icon: CardGiftcardIcon,
    title: 'Redeem',
    description: 'Use rewards for travel discounts and exclusive deals',
    step: 4,
  },
];

export const HowItWorks = () => {
  return (
    <Box
      id="how-it-works"
      sx={{
        py: { xs: 8, md: 16 },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
          <SectionHeader
            title="How It Works"
            subtitle="Get started in just 4 simple steps"
            align="center"
          />
        </AnimatedSection>

        {/* Steps Grid */}
        <Box sx={{ mt: 8 }}>
          <Grid container spacing={4} sx={{ position: 'relative' }}>
            {/* Connecting Line - Desktop only */}
            <Box
              sx={{
                position: 'absolute',
                top: 60,
                left: '12.5%',
                right: '12.5%',
                height: '2px',
                bgcolor: '#3b82f6',
                display: { xs: 'none', md: 'block' },
                zIndex: 0,
              }}
            />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <AnimatedSection
                    animation="fadeUp"
                    duration={0.6}
                    delay={0.1 + index * 0.15}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {/* Icon Circle */}
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          background: '#002d73',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          position: 'relative',
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
                          },
                        }}
                      >
                        <Icon sx={{ fontSize: 50, color: 'white' }} />
                      </Box>

                      {/* Step Title */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          mb: 1.5,
                          color: '#1e293b',
                        }}
                      >
                        {step.title}
                      </Typography>

                      {/* Step Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#64748b',
                          lineHeight: 1.7,
                          maxWidth: 240,
                          mx: 'auto',
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </AnimatedSection>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
