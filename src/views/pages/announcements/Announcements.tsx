import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  CircularProgress,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { announcementsApi, Announcement } from '../../../api/announcementsApi';
import { SectionHeader } from '../../landing/components/SectionHeader';
import { AnimatedSection } from '../../landing/components/AnimatedSection';
import Loader from '../../../components/shared/Loader';

// Default placeholder image for announcements without images
const DEFAULT_IMAGE = '/images/placeholder.jpg';

// Type labels for chips
const typeLabels: Record<string, string> = {
  info: 'Info',
  warning: 'Warning',
  success: 'Success',
  error: 'Alert',
};

// Helper to create URL-friendly slug
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Encode ID to base36 for shorter, cleaner URLs
const encodeId = (id: number): string => {
  return id.toString(36);
};

const ITEMS_PER_PAGE = 4;

const Announcements = () => {
  const navigate = useNavigate();
  const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([]);
  const [displayedAnnouncements, setDisplayedAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      const data = await announcementsApi.getAnnouncements();
      setAllAnnouncements(data);
      // Initially display first batch
      setDisplayedAnnouncements(data.slice(0, ITEMS_PER_PAGE));
      setHasMore(data.length > ITEMS_PER_PAGE);
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  // Load more announcements
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    // Simulate a small delay for smoother UX
    setTimeout(() => {
      const currentLength = displayedAnnouncements.length;
      const nextBatch = allAnnouncements.slice(currentLength, currentLength + ITEMS_PER_PAGE);

      setDisplayedAnnouncements(prev => [...prev, ...nextBatch]);
      setHasMore(currentLength + nextBatch.length < allAnnouncements.length);
      setLoadingMore(false);
    }, 300);
  }, [loadingMore, hasMore, displayedAnnouncements.length, allAnnouncements]);

  // Set up Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, hasMore, loadingMore, loadMore]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 4,
            flexWrap: 'wrap',
            gap: 3,
          }}
        >
          <AnimatedSection animation="fadeLeft" duration={0.8} delay={0}>
            <SectionHeader
              badge="STAY UPDATED"
              badgeColor="#1b60ff"
              title="Announcements"
              subtitle="Stay informed with the latest news and updates from Trip Travel & Tours"
              align="left"
              containerSx={{ mb: 0, flex: 1 }}
            />
          </AnimatedSection>
        </Box>

        {/* Loading State */}
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 300,
            }}
          >
            <Loader />
          </Box>
        ) : allAnnouncements.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 300,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No announcements at this time. Check back soon!
            </Typography>
          </Box>
        ) : (
          <>
            {/* Announcements Grid */}
            <Grid container spacing={3}>
              {displayedAnnouncements.map((announcement, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={announcement.id}>
                  <AnimatedSection animation="fadeUp" duration={0.5} delay={0.05 * (index % 4)}>
                    <Card
                      onClick={() => navigate(`/announcements/${announcement.type}/${encodeId(announcement.id)}/${createSlug(announcement.title)}`)}
                      sx={{
                        height: 420,
                        borderRadius: 3,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                          '& .announcement-image': {
                            transform: 'scale(1.1)',
                          },
                        },
                      }}
                    >
                      {/* Image */}
                      <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                        <CardMedia
                          component="img"
                          image={announcement.images?.[0] || DEFAULT_IMAGE}
                          alt={announcement.title}
                          className="announcement-image"
                          sx={{
                            height: 160,
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                        {/* <Box
                          sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                          }}
                        >
                          <Chip
                            label={typeLabels[announcement.type] || announcement.type}
                            sx={{
                              bgcolor: 'background.paper',
                              color: 'primary.main',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                            }}
                          />
                        </Box> */}
                      </Box>

                      <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Date */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                          <Typography variant="caption" sx={{ color: '#6B7280' }}>
                            {formatDate(announcement.createdAt)}
                          </Typography>
                        </Box>

                        {/* Title */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                            fontSize: '1.125rem',
                            lineHeight: 1.4,
                            height: '3.15rem', // Fixed height for 2 lines
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {announcement.title}
                        </Typography>

                        {/* Message excerpt */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#6B7280',
                            mb: 3,
                            lineHeight: 1.6,
                            height: '4.8rem', // Fixed height for 3 lines
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {announcement.message}
                        </Typography>

                        {/* Read More Button */}
                        <Button
                          variant="text"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/announcements/${announcement.type}/${encodeId(announcement.id)}/${createSlug(announcement.title)}`);
                          }}
                          sx={{ alignSelf: 'flex-start', mt: 'auto' }}
                        >
                          Read More
                          <ArrowForwardIcon sx={{ width: 18, ml: 0.5 }} />
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                </Grid>
              ))}
            </Grid>

            {/* Infinite Scroll Trigger / Loading More / End Message */}
            <Box
              ref={loadMoreRef}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 6,
                py: 2,
              }}
            >
              {loadingMore ? (
                <CircularProgress size={32} />
              ) : !hasMore ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'text.secondary',
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
                  <Typography variant="body2">
                    You've seen all announcements
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Announcements;
