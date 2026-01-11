import { Box, Container } from '@mui/material';
import { SectionHeader } from '../components/SectionHeader';

export const Video = () => {
  return (
    <Box
      id="video"
      sx={{
        py: { xs: 6, md: 12 },
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Title */}
        <SectionHeader
          title="Watch Our Journey"
          subtitle="Discover amazing travel experiences and destinations"
          align="center"
        />

        {/* Video Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            // maxWidth: '900px',
            margin: '0 auto',
            paddingTop: '56.25%', // 16:9 aspect ratio
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          }}
        >
          <Box
            component="iframe"
            src="https://www.youtube.com/embed/GBNyrfzGC0c?si=2JD-wCa7ywCiHKmo"
            title="YouTube video player"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </Box>
      </Container>
    </Box>
  );
};
