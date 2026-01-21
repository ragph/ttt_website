import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import { Candidate } from '../data/CandidateData'

interface CandidateCardProps {
  candidate: Candidate;
  candidateNumber?: number;
  onClick: () => void;
}

const CandidateCard = ({ candidate, candidateNumber, onClick }: CandidateCardProps) => {
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
        {candidateNumber && (
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.5 }}>
            Candidate #{candidateNumber}
          </Typography>
        )}
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
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
