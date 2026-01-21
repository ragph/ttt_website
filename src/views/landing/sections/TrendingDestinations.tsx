import { Box, Container, Typography, SxProps, Theme } from "@mui/material";
import { SectionHeader } from "../components/SectionHeader";
import { AnimatedSection } from "../components/AnimatedSection";

interface Destination {
  name: string;
  countryCode: string;
  image: string;
}

const destinations: Destination[] = [
  {
    name: "Manila",
    countryCode: "ph",
    image:
      "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=800&h=600&fit=crop",
  },
  {
    name: "Cebu City",
    countryCode: "ph",
    image:
      "https://images.unsplash.com/photo-1505015390928-f9e55218544f?w=800&h=600&fit=crop",
  },
  {
    name: "Tokyo",
    countryCode: "jp",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
  },
  {
    name: "Tagaytay",
    countryCode: "ph",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&h=600&fit=crop",
  },
  {
    name: "Baguio",
    countryCode: "ph",
    image:
      "https://images.unsplash.com/photo-1603852452378-a4e8d84324a2?w=800&h=600&fit=crop",
  },
];

const DestinationCard = ({
  destination,
  sx,
}: {
  destination: Destination;
  sx?: SxProps<Theme>;
}) => (
  <Box
    sx={{
      position: "relative",
      borderRadius: 2,
      overflow: "hidden",
      cursor: "pointer",
      "&:hover": {
        "& .destination-image": {
          transform: "scale(1.1)",
        },
        "& .overlay": {
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        },
      },
      ...sx,
    }}
  >
    <Box
      className="destination-image"
      component="img"
      src={destination.image}
      alt={destination.name}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.4s ease",
      }}
    />
    <Box
      className="overlay"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
        transition: "background 0.3s ease",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: 700,
          fontSize: { xs: "1rem", md: "1.25rem" },
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        {destination.name}
      </Typography>
      <Box
        component="img"
        src={`https://flagcdn.com/w40/${destination.countryCode}.png`}
        alt={destination.countryCode.toUpperCase()}
        sx={{
          width: { xs: 24, md: 28 },
          height: "auto",
        }}
      />
    </Box>
  </Box>
);

export const TrendingDestinations = () => {
  return (
    <Box
      id="trending-destinations"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
          <SectionHeader
            title="Trending Destinations"
            subtitle="Most popular choices for travelers from the Philippines"
            align="left"
            titleColor="#1F2937"
            containerSx={{ mb: 4 }}
          />
        </AnimatedSection>

        {/* Bento Grid Layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
            gridTemplateRows: { xs: "auto", md: "260px 220px" },
            gap: 2,
          }}
        >
          {/* Top Left - Large Card (Manila) */}
          <AnimatedSection animation="fadeUp" duration={0.6} delay={0.1}>
            <DestinationCard
              destination={destinations[0]}
              sx={{ height: { xs: 200, md: "100%" } }}
            />
          </AnimatedSection>

          {/* Top Right - Large Card (Cebu City) */}
          <AnimatedSection animation="fadeUp" duration={0.6} delay={0.2}>
            <DestinationCard
              destination={destinations[1]}
              sx={{ height: { xs: 200, md: "100%" } }}
            />
          </AnimatedSection>

          {/* Bottom Row - 3 smaller cards */}
          <Box
            sx={{
              gridColumn: { xs: "1", md: "1 / -1" },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            <AnimatedSection animation="fadeUp" duration={0.6} delay={0.3}>
              <DestinationCard
                destination={destinations[2]}
                sx={{ height: { xs: 180, sm: 220 } }}
              />
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" duration={0.6} delay={0.4}>
              <DestinationCard
                destination={destinations[3]}
                sx={{ height: { xs: 180, sm: 220 } }}
              />
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" duration={0.6} delay={0.5}>
              <DestinationCard
                destination={destinations[4]}
                sx={{ height: { xs: 180, sm: 220 } }}
              />
            </AnimatedSection>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
