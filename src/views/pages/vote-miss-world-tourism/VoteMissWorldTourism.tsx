import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Chip, IconButton, Snackbar } from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

interface Step {
  id: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 'vote-step-1',
    title: 'Access Voting Portal',
    description: 'Navigate to the Miss World Tourism 2027 voting section from the main menu or events page. You can find the voting portal in the announcements section or through direct links shared on our social media channels.',
  },
  {
    id: 'vote-step-2',
    title: 'Select Contestant',
    description: 'Browse through the contestants and view their profiles. Learn about each contestant\'s background, achievements, and their vision for promoting tourism. Take your time to explore all the amazing candidates representing different regions.',
  },
  {
    id: 'vote-step-3',
    title: 'Cast Your Vote',
    description: 'Confirm your selection and submit your vote. You can use your credits to cast multiple votes and increase your impact in supporting your favorite contestant. Every vote counts toward helping them win the crown!',
  },
];

const VoteMissWorldTourism = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  const accentColor = '#1e40af';

  // Update meta tags for SEO
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'How to Vote in Miss World Tourism 2027 | Trip Travel & Tours';

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

    setMetaTag('description', 'Learn how to cast your vote online to support your favorite contestant in Miss World Tourism 2027. Every vote counts!');
    setMetaTag('og:title', 'How to Vote in Miss World Tourism 2027 | Trip Travel & Tours', true);
    setMetaTag('og:description', 'Step-by-step guide to vote for Miss World Tourism 2027 contestants.', true);

    return () => {
      document.title = originalTitle;
    };
  }, []);

  const handleShare = async () => {
    const url = `${window.location.origin}/vote-miss-world-tourism-2027`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'How to Vote in Miss World Tourism 2027',
          text: 'Learn how to cast your vote online for Miss World Tourism 2027.',
          url: url,
        });
      } catch (err) {
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

  const scrollToContent = () => {
    const element = document.getElementById('vote-content');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Banner */}
      <Box
        sx={{
          bgcolor: accentColor,
          color: 'white',
          pt: { xs: 8, md: 10 },
          pb: { xs: 4, md: 6 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          {/* <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/how-it-works')}
            sx={{
              color: 'white',
              mb: 3,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Back to How It Works
          </Button> */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.2,
            }}
          >
            How to Vote in Miss World Tourism Festival Philippines 2027
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.95,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Cast your vote online to support your favorite contestant. Every vote counts in crowning the next Miss World Tourism!
          </Typography>
        </Container>
      </Box>

      {/* Content Section */}
      <Box
        id="vote-content"
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor: 'background.paper',
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
                      src="/images/et-vote.png?r=01"
                      alt="Vote Miss World Tourism screenshot"
                      loading="lazy"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.style.display = 'none';
                      }}
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
                    <HowToVoteIcon sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Chip
                    label="3 Easy Steps"
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
                    Vote for Miss World Tourism 2027
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
                  Cast your vote online to support your favorite contestant in Miss World Tourism 2027. Every vote counts!
                </Typography>
              </Box>

              {/* Steps List */}
              <Box>
                {steps.map((step, stepIndex) => (
                  <Box
                    key={step.id}
                    sx={{
                      display: 'flex',
                      gap: { xs: 2, sm: 2.5 },
                      mb: stepIndex === steps.length - 1 ? 0 : 3,
                    }}
                  >
                    {/* Step Number & Line */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      {/* Number Circle */}
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          minWidth: 36,
                          borderRadius: '50%',
                          bgcolor: accentColor,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          boxShadow: `0 2px 8px ${accentColor}40`,
                        }}
                      >
                        {stepIndex + 1}
                      </Box>

                      {/* Connecting Line */}
                      {stepIndex !== steps.length - 1 && (
                        <Box
                          sx={{
                            width: 2,
                            flex: 1,
                            minHeight: 24,
                            bgcolor: 'divider',
                            mt: 1,
                          }}
                        />
                      )}
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1, pb: stepIndex === steps.length - 1 ? 0 : 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: 'text.primary',
                          mb: 0.5,
                          fontSize: { xs: '0.95rem', sm: '1.05rem' },
                          lineHeight: 1.3,
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

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
            Ready to Vote?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              mb: 4,
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            Support your favorite contestant and help them win the crown!
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/surveys/miss-world-tourism-festival-2027"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              bgcolor: 'white',
              color: accentColor,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Go to Voting Portal
          </Button>
        </Container>
      </Box>

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

export default VoteMissWorldTourism;
