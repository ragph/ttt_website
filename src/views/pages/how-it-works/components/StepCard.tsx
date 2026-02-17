import { Box, Typography } from '@mui/material';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  isLast?: boolean;
  accentColor?: string;
}

export const StepCard = ({
  stepNumber,
  title,
  description,
  isLast = false,
  accentColor = '#1e40af',
}: StepCardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 2, sm: 2.5 },
        mb: isLast ? 0 : 3,
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
          {stepNumber}
        </Box>

        {/* Connecting Line */}
        {!isLast && (
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
      <Box sx={{ flex: 1, pb: isLast ? 0 : 1 }}>
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
          {title}
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
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
