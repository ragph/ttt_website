import { useState } from 'react';
import { Box, Typography, Container, Chip, IconButton, Snackbar } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ShareIcon from '@mui/icons-material/Share';
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const Icon = sectionIcons[section.id] || AccountBalanceWalletIcon;
  const accentColor = sectionColors[section.id] || '#1e40af';
  const isEven = index % 2 === 0;

  const handleShare = async () => {
    const url = `${window.location.origin}/how-it-works#${section.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: section.title,
          text: section.description,
          url: url,
        });
      } catch (err) {
        // User cancelled or share failed, fall back to copy
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Box
      id={section.id}
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: isEven ? 'background.default' : 'background.paper',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: { xs: 5, lg: 8 },
            alignItems: { xs: 'center', lg: 'center' },
          }}
        >
          {/* Phone Mockup with Screenshot */}
          <Box
            sx={{
              flex: { lg: '0 0 340px' },
              order: { xs: 0, lg: isEven ? 0 : 1 },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 260, sm: 300 },
                height: { xs: 520, sm: 600 },
              }}
            >
              {/* Phone Frame */}
              <Box
                sx={{
                  p: '8px',
                }}
              >
                {/* Screen */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: 5,
                  }}
                >
                  {/* Screenshot Image */}
                  <Box
                    component="img"
                    src={section.image}
                    alt={`${section.title} screenshot`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }}
                  />
                </Box>
              </Box>

              {/* Decorative Elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: accentColor,
                  opacity: 0.1,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -10,
                  left: -10,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: accentColor,
                  opacity: 0.08,
                }}
              />
            </Box>
          </Box>

          {/* Content Section */}
          <Box
            sx={{
              flex: 1,
              order: { xs: 1, lg: isEven ? 1 : 0 },
            }}
          >
            {/* Section Header */}
            <Box
              sx={{
                mb: 4,
                textAlign: { xs: 'center', lg: 'left' },
              }}
            >
              {/* Icon & Chip Row */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2,
                  justifyContent: { xs: 'center', lg: 'flex-start' },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 14px ${accentColor}40`,
                  }}
                >
                  <Icon sx={{ fontSize: 28, color: 'white' }} />
                </Box>
                <Chip
                  label={`Step ${index + 1} of 3`}
                  size="small"
                  sx={{
                    bgcolor: `${accentColor}15`,
                    color: accentColor,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  justifyContent: { xs: 'center', lg: 'flex-start' },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: 'text.primary',
                    mb: 1,
                    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {section.title}
                </Typography>
                <IconButton
                  onClick={handleShare}
                  size="small"
                  sx={{
                    color: accentColor,
                    bgcolor: `${accentColor}10`,
                    mb: 1,
                    '&:hover': {
                      bgcolor: `${accentColor}20`,
                    },
                  }}
                >
                  <ShareIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.7,
                  maxWidth: 500,
                  mx: { xs: 'auto', lg: 0 },
                }}
              >
                {section.description}
              </Typography>
            </Box>

            {/* Steps List */}
            <Box>
              {section.steps.map((step, stepIndex) => (
                <StepCard
                  key={step.id}
                  stepNumber={stepIndex + 1}
                  title={step.title}
                  description={step.description}
                  isLast={stepIndex === section.steps.length - 1}
                  accentColor={accentColor}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};
