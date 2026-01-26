import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { announcementsApi, Announcement } from '../../../api/announcementsApi';
import { SectionHeader } from '../../landing/components/SectionHeader';
import Loader from '../../../components/shared/Loader';

// Type-based colors and icons
const typeConfig = {
  info: {
    bgcolor: '#e3f2fd',
    borderColor: '#2196f3',
    color: '#1565c0',
    icon: InfoIcon,
  },
  warning: {
    bgcolor: '#fff3e0',
    borderColor: '#ff9800',
    color: '#e65100',
    icon: WarningIcon,
  },
  success: {
    bgcolor: '#e8f5e9',
    borderColor: '#4caf50',
    color: '#2e7d32',
    icon: CheckCircleIcon,
  },
  error: {
    bgcolor: '#ffebee',
    borderColor: '#f44336',
    color: '#c62828',
    icon: ErrorIcon,
  },
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      const data = await announcementsApi.getAnnouncements();
      setAnnouncements(data);
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <SectionHeader
          badge="STAY UPDATED"
          title="Announcements"
          subtitle="Stay informed with the latest news and updates from Trip Travel & Tours"
          align="center"
          containerSx={{ mb: 4 }}
        />

        {/* Loading State */}
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Announcements List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {announcements.map((announcement) => {
                const config = typeConfig[announcement.type] || typeConfig.info;
                const IconComponent = config.icon;

                return (
                  <Card
                    key={announcement.id}
                    sx={{
                      bgcolor: config.bgcolor,
                      borderLeft: `4px solid ${config.borderColor}`,
                      borderRadius: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* Header with Icon and Title */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        <IconComponent sx={{ fontSize: 28, color: config.color }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: config.color }}>
                          {announcement.title}
                        </Typography>
                      </Box>

                      {/* Message */}
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#333',
                          lineHeight: 1.6,
                          mb: 2,
                        }}
                      >
                        {announcement.message}
                      </Typography>

                      {/* Meta info */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: 1,
                          borderTop: '1px solid rgba(0,0,0,0.1)',
                          pt: 2,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Posted: {formatDate(announcement.createdAt)}
                        </Typography>
                        {announcement.endDate && (
                          <Typography variant="caption" color="text.secondary">
                            Valid until: {formatDate(announcement.endDate)}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </>
        )}

        {/* Empty State */}
        {!loading && announcements.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No announcements at this time
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Announcements;
