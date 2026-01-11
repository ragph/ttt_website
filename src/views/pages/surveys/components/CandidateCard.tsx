import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import { Candidate } from '../data/CandidateData'

interface CandidateCardProps {
  candidate: Candidate;
  onClick: () => void;
}

const CandidateCard = ({ candidate, onClick }: CandidateCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        image={candidate.image}
        alt={candidate.name}
        sx={{
          aspectRatio: '1 / 1',
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
          {candidate.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {candidate.region}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
