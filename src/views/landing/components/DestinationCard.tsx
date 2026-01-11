import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface DestinationCardProps {
  image: string;
  title: string;
  country: string;
  flag: string;
  price: string;
  rating?: number;
  countryCode?: string;
}

export const DestinationCard = ({ image, title, country, flag, price, rating = 4.8, countryCode }: DestinationCardProps) => {
  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          '& .destination-image': {
            transform: 'scale(1.1)',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden', height: 240 }}>
        <CardMedia
          component="img"
          height="240"
          image={image}
          alt={title}
          className="destination-image"
          sx={{
            transition: 'transform 0.3s ease',
          }}
        />
        {countryCode && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
            }}
          >
            <Box
              component="img"
              src={`https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`}
              alt={`${country} flag`}
              sx={{
                width: 50,
                height: 35,
                borderRadius: 1,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            />
          </Box>
        )}
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 16, color: '#6B7280' }} />
            <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 500 }}>
              {country}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 2,
            fontSize: '1.125rem',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 2,
          }}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: 'secondary.main',
              color: '#000',
            }}
          >
            Explore
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
