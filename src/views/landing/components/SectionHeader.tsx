import { Box, Typography, Chip } from '@mui/material';

interface SectionHeaderProps {
  badge?: string;
  badgeColor?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  titleColor?: string;
  subtitleColor?: string;
  containerSx?: object;
}

export const SectionHeader = ({
  badge,
  badgeColor = 'primary.main',
  title,
  subtitle,
  align = 'center',
  titleColor,
  subtitleColor = '#6B7280',
  containerSx = {},
}: SectionHeaderProps) => {
  return (
    <Box
      sx={{
        textAlign: align,
        mb: { xs: 4, md: 6 },
        ...containerSx,
      }}
    >
      {/* Optional Badge/Label */}
      {badge && (
        <Typography
          variant="overline"
          sx={{
            color: badgeColor,
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: 1.5,
            display: 'block',
          }}
        >
          {badge}
        </Typography>
      )}

      {/* Main Title */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
          fontWeight: 800,
          color: titleColor || 'text.primary',
          mb: subtitle ? 2 : 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      {/* Optional Subtitle */}
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: subtitleColor,
            fontSize: '1rem',
            lineHeight: 1.7,
            maxWidth: align === 'center' ? '800px' : '100%',
            mx: align === 'center' ? 'auto' : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

// Alternative chip-based badge component
interface SectionHeaderWithChipProps extends Omit<SectionHeaderProps, 'badge' | 'badgeColor'> {
  chip?: string;
  chipBgColor?: string;
}

export const SectionHeaderWithChip = ({
  chip,
  chipBgColor = '#FDE047',
  title,
  subtitle,
  align = 'left',
  titleColor,
  subtitleColor = '#6B7280',
  containerSx = {},
}: SectionHeaderWithChipProps) => {
  return (
    <Box
      sx={{
        textAlign: align,
        mb: { xs: 4, md: 6 },
        ...containerSx,
      }}
    >
      {/* Optional Chip */}
      {chip && (
        <Chip
          label={chip}
          sx={{
            bgcolor: chipBgColor,
            color: '#1F2937',
            fontWeight: 600,
            fontSize: '0.875rem',
            mb: 3,
            '& .MuiChip-label': {
              px: 2,
            },
          }}
        />
      )}

      {/* Main Title */}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
          fontWeight: 800,
          color: titleColor || 'text.primary',
          mb: subtitle ? 2 : 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      {/* Optional Subtitle */}
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            fontSize: '1rem',
            color: subtitleColor,
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
