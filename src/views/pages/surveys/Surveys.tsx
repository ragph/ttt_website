import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Grid,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { surveyApi, Survey } from '../../../api/surveyApi';
import SurveyCard from './components/SurveyCard';
import { SectionHeader } from '../../landing/components/SectionHeader';
import Loader from '../../../components/shared/Loader';

const Surveys = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['All']);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch surveys from API
  useEffect(() => {
    const fetchSurveys = async () => {
      setLoading(true);
      const data = await surveyApi.getPublicSurveysWithCategories();
      setSurveys(data.surveys);

      // Use all categories from API (including empty ones)
      setCategories(['All', ...data.categories]);

      setLoading(false);
    };

    fetchSurveys();
  }, []);

  const filteredSurveys =
    selectedCategory === 'All'
      ? surveys
      : surveys.filter((survey) => survey.category === selectedCategory);

  // Helper function to create URL-friendly slug from title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSurveyClick = (survey: Survey) => {
    const slug = createSlug(survey.title);
    navigate(`/surveys/${slug}`, { state: { surveyId: survey.id } });
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <SectionHeader
          badge="SHARE YOUR EXPERIENCE"
          title="Surveys and Votings"
          subtitle="Share your travel experiences and help us improve our services"
          align="center"
          containerSx={{ mb: 4 }}
        />

        {/* Loading State */}
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Filter Chips - Horizontally Scrollable */}
            <Paper
              elevation={1}
              sx={{
                mb: 4,
                p: 2,
                overflowX: 'auto',
                display: 'flex',
                gap: 1,
                '&::-webkit-scrollbar': {
                  height: 8,
                },
                '&::-webkit-scrollbar-track': {
                  bgcolor: 'background.default',
                  borderRadius: 4,
                },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'divider',
                  borderRadius: 4,
                  '&:hover': {
                    bgcolor: 'text.secondary',
                  },
                },
              }}
            >
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                  color={selectedCategory === category ? 'primary' : 'default'}
                  variant={selectedCategory === category ? 'filled' : 'outlined'}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: selectedCategory === category ? 600 : 400,
                    whiteSpace: 'nowrap',
                  }}
                />
              ))}
            </Paper>

            {/* Survey Cards Grid - 3 Columns */}
            <Grid container spacing={3}>
              {filteredSurveys.map((survey) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={survey.id}>
                  <SurveyCard
                    survey={survey}
                    onClick={() => handleSurveyClick(survey)}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Empty State */}
        {!loading && filteredSurveys.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No surveys found in this category
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Surveys;
