import { Box, Container, Typography, Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { SectionHeader } from "../components/SectionHeader";
import { AnimatedSection } from "../components/AnimatedSection";

export const Categories = () => {
  const tourismTypes = [
    {
      title: "Leisure Tourism",
      description: "Relaxation, vacation, beaches, resorts, sightseeing.",
    },
    {
      title: "Business Tourism",
      description: "Meetings, conferences, corporate events (MICE).",
    },
    {
      title: "Medical Tourism",
      description: "Travelling for medical procedures or wellness treatments.",
    },
    {
      title: "Sports Tourism",
      description: "Watching or participating in sports events.",
    },
  ];

  const destinations = [
    {
      image:
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
      title: "Santorini, Greece",
      overlay: true,
    },
    {
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=300&fit=crop",
      title: "Mykonos",
      overlay: false,
    },
  ];

  return (
    <Box
      id="categories"
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(255, 250, 245, 0.30) 100%), url(/images/silhouette2.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
              <SectionHeader
                title="Explore Our Tourism Categories With Our Travel Specialists"
                subtitle="From relaxing beach getaways to professional business trips, wellness-focused journeys, and exciting sports adventures."
                align="left"
                titleColor="#1F2937"
                containerSx={{ mb: 4 }}
              />
            </AnimatedSection>

            {/* Tourism Types List */}
            <Box sx={{ mb: 4 }}>
              {tourismTypes.map((type, index) => (
                <AnimatedSection
                  key={index}
                  animation="fadeLeft"
                  duration={0.6}
                  delay={0.1 + index * 0.1}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      mb: 2.5,
                    }}
                  >
                    <CheckCircleIcon
                      sx={{
                        color: "success.main",
                        fontSize: "1.5rem",
                        mr: 2,
                        mt: 0.2,
                        flexShrink: 0,
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: "#1F2937",
                          mb: 0.5,
                        }}
                      >
                        {type.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          fontSize: "0.875rem",
                        }}
                      >
                        {type.description}
                      </Typography>
                    </Box>
                  </Box>
                </AnimatedSection>
              ))}
            </Box>

            {/* CTA Button */}
            <AnimatedSection animation="fadeUp" duration={0.6} delay={0.5}>
              <Button
                variant="contained"
                size="large"
                href="http://etapp.triptravelandtours.com"
                sx={{
                  px: 4,
                  py: 1.5,
                  width: { xs: "100%", sm: "auto" },
                  borderRadius: 25,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Book Your Trip Now
              </Button>
            </AnimatedSection>
          </Grid>

          {/* Right Images */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedSection animation="fadeRight" duration={0.8} delay={0.2}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  height: { xs: 400, md: 500 },
                }}
              >
                {/* Large Image */}
                <Box
                  sx={{
                    width: "65%",
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      "& .destination-image": {
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                >
                  <Box
                    className="destination-image"
                    component="img"
                    src={destinations[0].image}
                    alt={destinations[0].title}
                    sx={{
                      transition: "all 0.3s ease",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: { xs: "1.25rem", md: "1.5rem" },
                      }}
                    >
                      {destinations[0].title}
                    </Typography>
                  </Box>
                </Box>
                {/* Small Image */}
                <Box
                  sx={{
                    width: "33%",
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    alignSelf: "flex-start",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      "& .destination-image": {
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                >
                  <Box
                    className="destination-image"
                    component="img"
                    src={destinations[1].image}
                    alt={destinations[1].title}
                    sx={{
                      width: "100%",
                      height: 250,
                      objectFit: "cover",
                      transition: "all 0.3s ease",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      {destinations[1].title}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </AnimatedSection>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
