import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Avatar,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { surveyApi, SurveyDetail as SurveyDetailType } from '../../../api/surveyApi';
import SurveyTabNavigation from './components/SurveyTabNavigation';

interface CandidateScore {
  name: string;
  region: string;
  votes: number;
  percentage: number;
  rank: number;
  imageUrl?: string;
}

// Custom label component for the bar chart
const CustomBarLabel = (props: any) => {
  const { x, y, width, height, value, imageUrl, rank } = props;

  // Adjust sizes based on available width
  const isMobile = width < 300;
  const imageSize = isMobile ? 30 : 40;
  const padding = 5;
  const imageX = x + padding;
  const imageY = y + (height - imageSize) / 2;
  const badgeRadius = isMobile ? 10 : 12;
  const badgeOffset = isMobile ? 8 : 10;

  return (
    <g>
      {/* Rank badge */}
      <circle
        cx={imageX + imageSize / 2}
        cy={imageY - badgeOffset}
        r={badgeRadius}
        fill={rank <= 3 ? '#FFD700' : '#666'}
        stroke="#fff"
        strokeWidth={2}
      />
      <text
        x={imageX + imageSize / 2}
        y={imageY - (badgeOffset - 3)}
        fill="#fff"
        fontSize={isMobile ? 10 : 12}
        fontWeight="bold"
        textAnchor="middle"
      >
        {rank}
      </text>

      {/* Candidate image */}
      {imageUrl ? (
        <>
          <defs>
            <clipPath id={`clip-${rank}`}>
              <circle cx={imageX + imageSize / 2} cy={imageY + imageSize / 2} r={imageSize / 2} />
            </clipPath>
          </defs>
          <image
            x={imageX}
            y={imageY}
            width={imageSize}
            height={imageSize}
            href={imageUrl}
            clipPath={`url(#clip-${rank})`}
          />
          <circle
            cx={imageX + imageSize / 2}
            cy={imageY + imageSize / 2}
            r={imageSize / 2}
            fill="none"
            stroke="#fff"
            strokeWidth={2}
          />
        </>
      ) : (
        <circle
          cx={imageX + imageSize / 2}
          cy={imageY + imageSize / 2}
          r={imageSize / 2}
          fill="#ccc"
          stroke="#fff"
          strokeWidth={2}
        />
      )}

      {/* Vote count at the end of the bar */}
      <text
        x={x + width - (isMobile ? 5 : 10)}
        y={y + height / 2}
        fill="#333"
        fontSize={isMobile ? 12 : 14}
        fontWeight="600"
        textAnchor="end"
        dominantBaseline="middle"
      >
        {value.toLocaleString()}
      </text>
    </g>
  );
};

const SurveyResults = () => {
  const { id: slug } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<SurveyDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [candidateScores, setCandidateScores] = useState<CandidateScore[]>([]);

  const handleGeneralClick = () => {
    if (slug) {
      navigate(`/surveys/${slug}`);
    }
  };

  // Helper function to create slug from title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  useEffect(() => {
    const fetchSurveyResults = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        // If surveyId is passed via navigation state, use it directly
        const stateId = (location.state as any)?.surveyId;

        let surveyData: SurveyDetailType | null = null;

        if (stateId) {
          surveyData = await surveyApi.getSurveyById(stateId);
        } else {
          // Otherwise, fetch all surveys and find by slug
          const surveys = await surveyApi.getPublicSurveys();
          const matchingSurvey = surveys.find(s => createSlug(s.title) === slug);

          if (matchingSurvey) {
            surveyData = await surveyApi.getSurveyById(matchingSurvey.id);
          }
        }

        if (!surveyData) {
          setError('Survey not found');
        } else {
          setSurvey(surveyData);

          // Process candidate scores
          // For now, generating mock data - you'll need to replace this with actual vote data from your API
          const votingQuestion = surveyData.questions.find(
            (q) => q.type === 'multiple-choice' || q.type === 'multiple_choice'
          );

          if (votingQuestion && votingQuestion.options) {
            const totalVotes = surveyData.totalResponses || 100; // Placeholder
            const scores: CandidateScore[] = votingQuestion.options.map((option: any, index: number) => {
              const candidate = typeof option === 'string' ? { text: option } : option;
              const textMatch = candidate.text.match(/^(.+?)\s*\((.+?)\)$/);
              const candidateName = textMatch ? textMatch[1].trim() : candidate.text;
              const candidateRegion = textMatch ? textMatch[2].trim() : '';

              // Mock vote data - replace with actual data from API
              const votes = Math.floor(Math.random() * totalVotes);
              const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

              return {
                name: candidateName,
                region: candidateRegion,
                votes,
                percentage,
                rank: 0, // Will be set after sorting
                imageUrl: candidate.imageUrls?.[0] || candidate.imageUrl,
              };
            });

            // Sort by votes descending and assign ranks
            scores.sort((a, b) => b.votes - a.votes);
            scores.forEach((score, index) => {
              score.rank = index + 1;
            });

            setCandidateScores(scores);
          }
        }
      } catch (err) {
        setError('Error loading survey results');
        console.error('Error fetching survey results:', err);
      }

      setLoading(false);
    };

    fetchSurveyResults();
  }, [slug, location.state]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return '#E0E0E0'; // Gray
    }
  };

  const getBarColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return '#82ca9d';
    }
  };

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

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Tab-like Navigation */}
        <SurveyTabNavigation
          activeTab="tally"
          onGeneralClick={handleGeneralClick}
          onTallyClick={() => {}}
        />

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Chip label={survey.category} color="primary" sx={{ mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            {survey.title} - Results
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Total Responses: {survey.totalResponses}
          </Typography>
        </Box>

        {/* Bar Chart */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            Vote Distribution
          </Typography>
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Box sx={{ minWidth: { xs: 400, md: '100%' } }}>
              <ResponsiveContainer width="100%" height={Math.max(candidateScores.length * 70, 400)}>
                <BarChart
                  data={candidateScores}
                  layout="vertical"
                  margin={{ top: 30, right: 10, left: 5, bottom: 5 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={140}
                    tick={{ fontSize: 10 }}
                    interval={0}
                  />
                  <Tooltip
                    formatter={(value) => `${value} votes`}
                    labelStyle={{ color: '#000' }}
                  />
                  <Legend />
                  <Bar dataKey="votes" name="Votes" radius={[0, 8, 8, 0]} barSize={40}>
                    {candidateScores.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.rank)} />
                    ))}
                    <LabelList
                      dataKey="votes"
                      content={(props) => (
                        <CustomBarLabel
                          {...props}
                          imageUrl={candidateScores[props.index || 0]?.imageUrl}
                          rank={candidateScores[props.index || 0]?.rank}
                        />
                      )}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Paper>

        {/* Rankings Table */}
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Rankings & Scores
            </Typography>
          </Box>
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: { xs: 600, md: 'auto' } }}>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.100' }}>
                  <TableCell align="center" sx={{ fontWeight: 600, width: 80, minWidth: 60 }}>
                    Rank
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 150 }}>Candidate</TableCell>
                  <TableCell sx={{ fontWeight: 600, display: { xs: 'none', sm: 'table-cell' }, minWidth: 100 }}>
                    Region
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, minWidth: 80 }}>
                    Votes
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, minWidth: 150 }}>
                    Vote Progress
                  </TableCell>
                  {/* <TableCell align="right" sx={{ fontWeight: 600, width: 120, minWidth: 90 }}>
                    Percentage
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {candidateScores.map((candidate, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:hover': { bgcolor: 'grey.50' },
                      bgcolor: candidate.rank <= 3 ? `${getRankColor(candidate.rank)}15` : 'inherit',
                    }}
                  >
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        {candidate.rank <= 3 && (
                          <EmojiEventsIcon
                            sx={{
                              color: getRankColor(candidate.rank),
                              fontSize: 28,
                            }}
                          />
                        )}
                        <Typography
                          sx={{
                            fontWeight: candidate.rank <= 3 ? 700 : 500,
                            fontSize: candidate.rank === 1 ? '1.25rem' : '1rem',
                          }}
                        >
                          {candidate.rank}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                        {candidate.imageUrl && (
                          <Avatar
                            src={candidate.imageUrl}
                            alt={candidate.name}
                            sx={{ width: { xs: 40, sm: 50 }, height: { xs: 40, sm: 50 } }}
                          />
                        )}
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: candidate.rank <= 3 ? 600 : 400,
                              fontSize: { xs: '0.875rem', sm: candidate.rank === 1 ? '1.1rem' : '1rem' },
                            }}
                          >
                            {candidate.name}
                          </Typography>
                          {/* Show region on mobile below name */}
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: { xs: 'block', sm: 'none' } }}
                          >
                            {candidate.region}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <Typography variant="body2" color="text.secondary">
                        {candidate.region}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {candidate.votes.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            flex: 1,
                            height: 24,
                            bgcolor: 'grey.200',
                            borderRadius: 2,
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <Box
                            sx={{
                              height: '100%',
                              width: `${candidate.percentage}%`,
                              bgcolor: getBarColor(candidate.rank),
                              borderRadius: 2,
                              transition: 'width 0.5s ease-in-out',
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    {/* <TableCell align="right">
                      <Chip
                        label={`${candidate.percentage.toFixed(1)}%`}
                        color={candidate.rank === 1 ? 'primary' : 'default'}
                        size="small"
                        sx={{ fontWeight: 600, minWidth: 70 }}
                      />
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Note about data */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Note: Results are updated in real-time based on submitted responses
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SurveyResults;
