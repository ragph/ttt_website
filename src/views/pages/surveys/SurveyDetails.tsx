import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import { surveyApi, SurveyDetail as SurveyDetailType, CandidateOption } from '../../../api/surveyApi';
import { SectionHeader } from '../../landing/components/SectionHeader';
import CandidateModal from './components/CandidateModal';
import SurveyTabNavigation from './components/SurveyTabNavigation';

const SurveyDetail = () => {
  const { id: slug } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<SurveyDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateOption | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Helper function to create slug from title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  useEffect(() => {
    const fetchSurvey = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        // If surveyId is passed via navigation state, use it directly
        const stateId = (location.state as any)?.surveyId;

        if (stateId) {
          const data = await surveyApi.getSurveyById(stateId);
          if (!data) {
            setError('Survey not found');
          } else {
            setSurvey(data);
          }
        } else {
          // Otherwise, fetch all surveys and find by slug
          const surveys = await surveyApi.getPublicSurveys();
          const matchingSurvey = surveys.find(s => createSlug(s.title) === slug);

          if (matchingSurvey) {
            const data = await surveyApi.getSurveyById(matchingSurvey.id);
            if (!data) {
              setError('Survey not found');
            } else {
              setSurvey(data);
            }
          } else {
            setError('Survey not found');
          }
        }
      } catch (err) {
        setError('Error loading survey');
        console.error('Error fetching survey:', err);
      }

      setLoading(false);
    };

    fetchSurvey();
  }, [slug, location.state]);

  const handleCandidateClick = (option: CandidateOption) => {
    setSelectedCandidate(option);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleTallyClick = () => {
    if (slug) {
      navigate(`/surveys/${slug}/results`);
    }
  };

  // Check if this is a pageant survey (case-insensitive)
  const isPageantSurvey = survey?.category.toLowerCase().includes('pageant') ||
                          survey?.category.toLowerCase().includes('beauty') ||
                          survey?.title.toLowerCase().includes('miss') ||
                          survey?.title.toLowerCase().includes('pageant');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !survey) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '100vh' }}>
        <Alert severity="error">{error || 'Survey not found'}</Alert>
      </Container>
    );
  }

  // Find the voting question (usually the first multiple choice question)
  const votingQuestion = survey.questions.find((q) => q.type === 'multiple-choice' || q.type === 'multiple_choice');

  console.log('All questions:', survey.questions);
  console.log('Voting question:', votingQuestion);
  console.log('Voting question options:', votingQuestion?.options);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Tab-like Navigation - Only show for pageant surveys */}
        {isPageantSurvey && (
          <SurveyTabNavigation
            activeTab="general"
            onGeneralClick={() => {}}
            onTallyClick={handleTallyClick}
          />
        )}

        {/* Survey Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Chip label={survey.category} color="primary" sx={{ mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            {survey.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {survey.description}
          </Typography>

          {/* Survey Main Image */}
          {survey.image && (
            <Box
              component="img"
              src={survey.image}
              alt={survey.title}
              sx={{
                width: '100%',
                maxWidth: 600,
                height: 'auto',
                mx: 'auto',
                mb: 4,
                borderRadius: 2,
              }}
            />
          )}

          {/* Response Count */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {survey.totalResponses} responses
            </Typography>
          </Box>

        </Box>

        {/* Voting Question */}
        {votingQuestion && (
          <>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', md: '2rem' } }}>
                {votingQuestion.question}
              </Typography>
            </Box>

            {/* Candidates Grid */}
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
              <Grid container spacing={3} justifyContent="center">
                {votingQuestion.options?.map((option: any, index: number) => {
                  const candidate: CandidateOption = typeof option === 'string'
                    ? { text: option }
                    : option;

                  // Get the first image (either from imageUrl or imageUrls array)
                  const thumbnailImage = candidate.imageUrls?.[0] || candidate.imageUrl;

                  // Extract name and region from text (format: "Name (Region)")
                  const textMatch = candidate.text.match(/^(.+?)\s*\((.+?)\)$/);
                  const candidateName = textMatch ? textMatch[1].trim() : candidate.text;
                  const candidateRegion = textMatch ? textMatch[2].trim() : '';

                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 2,
                          overflow: 'hidden',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          width: '100%',
                          maxWidth: 350,
                          mx: 'auto',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 4,
                          },
                        }}
                        onClick={() => handleCandidateClick(candidate)}
                      >
                        {thumbnailImage && (
                          <CardMedia
                            component="img"
                            image={thumbnailImage}
                            alt={candidate.text}
                            sx={{
                              width: '100%',
                              height: 350,
                              objectFit: 'cover',
                            }}
                          />
                        )}
                        <CardContent sx={{ textAlign: 'center', py: 2.5, px: 2, bgcolor: 'background.paper' }}>
                          <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5, lineHeight: 1.4 }}>
                            {candidateName}
                          </Typography>
                          {candidateRegion && (
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                              {candidateRegion}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </>
        )}
      </Container>

      {/* Candidate Modal */}
      {selectedCandidate && (
        <CandidateModal
          open={modalOpen}
          onClose={handleCloseModal}
          candidate={selectedCandidate}
        />
      )}
    </Box>
  );
};

export default SurveyDetail;
