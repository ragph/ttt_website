import { Box, Button } from '@mui/material';

interface SurveyTabNavigationProps {
  activeTab: 'general' | 'tally';
  onGeneralClick: () => void;
  onTallyClick: () => void;
}

const SurveyTabNavigation = ({ activeTab, onGeneralClick, onTallyClick }: SurveyTabNavigationProps) => {
  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Button
        variant={activeTab === 'general' ? 'contained' : 'outlined'}
        onClick={onGeneralClick}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: 2,
          textTransform: 'none',
          ...(activeTab === 'general'
            ? {
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }
            : {
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  bgcolor: 'rgba(59, 130, 246, 0.04)',
                },
              }),
        }}
      >
        General
      </Button>
      <Button
        variant={activeTab === 'tally' ? 'contained' : 'outlined'}
        onClick={onTallyClick}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: 2,
          textTransform: 'none',
          ...(activeTab === 'tally'
            ? {
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }
            : {
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  bgcolor: 'rgba(59, 130, 246, 0.04)',
                },
              }),
        }}
      >
        Tally Board
      </Button>
    </Box>
  );
};

export default SurveyTabNavigation;
