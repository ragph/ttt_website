import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Paper,
  IconButton,
  Snackbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShareIcon from '@mui/icons-material/Share';
import EventIcon from '@mui/icons-material/Event';
import { announcementsApi, Announcement } from '../../../api/announcementsApi';
import Loader from '../../../components/shared/Loader';

// Placeholder image for announcements
const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';

// Type labels for chips
const typeLabels: Record<string, string> = {
  info: 'Info',
  warning: 'Warning',
  success: 'Success',
  error: 'Alert',
};

// Helper to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Decode base36 ID back to number
const decodeId = (encoded: string): string => {
  return parseInt(encoded, 36).toString();
};

const AnnouncementDetails = () => {
  const { id } = useParams<{ type: string; id: string; title: string }>();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setSnackbarOpen(true);
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch announcement from API
  useEffect(() => {
    const fetchAnnouncement = async () => {
      if (!id) {
        setError('Announcement not found');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const announcementId = decodeId(id);
        const data = await announcementsApi.getAnnouncementById(Number(announcementId));
        if (data) {
          setAnnouncement(data);
        } else {
          setError('Announcement not found');
        }
      } catch (err) {
        setError('Failed to load announcement');
      }

      setLoading(false);
    };

    fetchAnnouncement();
  }, [id]);

  // Update meta tags when announcement is loaded
  useEffect(() => {
    if (!announcement) return;

    const originalTitle = document.title;
    const description = announcement.message.substring(0, 160);

    // Update document title
    document.title = `${announcement.title} | TTT Travel`;

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
    setMetaTag('og:title', announcement.title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', PLACEHOLDER_IMAGE, true);
    setMetaTag('og:url', window.location.href, true);
    setMetaTag('og:type', 'article', true);
    setMetaTag('og:site_name', 'TTT Travel', true);

    // Twitter Card meta tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', announcement.title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', PLACEHOLDER_IMAGE);

    // Cleanup: restore original title when component unmounts
    return () => {
      document.title = originalTitle;
    };
  }, [announcement]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader />
      </Box>
    );
  }

  if (error || !announcement) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h4">{error || 'Announcement not found'}</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/announcements')}
        >
          Back to Announcements
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 350, md: 450 },
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={PLACEHOLDER_IMAGE}
          alt={announcement.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            py: 3,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/announcements')}
            sx={{
              color: 'white',
              alignSelf: 'flex-start',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Back to Announcements
          </Button>
          <Box>
            <Chip
              label={typeLabels[announcement.type] || announcement.type}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 600,
                mb: 2,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                lineHeight: 1.2,
              }}
            >
              {announcement.title}
            </Typography>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarTodayIcon sx={{ color: 'white', fontSize: 18 }} />
                <Typography sx={{ color: 'white' }}>
                  {formatDate(announcement.createdAt)}
                </Typography>
              </Box>
              {announcement.endDate && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <EventIcon sx={{ color: 'white', fontSize: 18 }} />
                  <Typography sx={{ color: 'white' }}>
                    Valid until: {formatDate(announcement.endDate)}
                  </Typography>
                </Box>
              )}
              <IconButton
                onClick={handleShareClick}
                size="small"
                sx={{
                  color: 'white',
                  ml: 'auto',
                  p: 0.5,
                }}
              >
                <ShareIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      {/* Content Section */}
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            bgcolor: 'background.paper',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'text.secondary',
              whiteSpace: 'pre-wrap',
            }}
          >
            {announcement.message}
          </Typography>
        </Paper>

        {/* Back Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/announcements')}
            sx={{
              borderRadius: 999,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Back to All Announcements
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AnnouncementDetails;
