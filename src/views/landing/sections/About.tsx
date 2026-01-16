import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import StarIcon from "@mui/icons-material/Star";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { SectionHeader } from "../components/SectionHeader";
import { AnimatedSection } from "../components/AnimatedSection";

export const About = () => {
  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Side - Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedSection animation="fadeLeft" duration={0.8} delay={0}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  gap: 2,
                  height: { xs: "auto", md: 550 },
                }}
              >
                {/* Main Image */}
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=800&fit=crop"
                  alt="Travel Planning"
                  className="travel-img-1"
                  sx={{
                    width: "60%",
                    height: "100%",
                    borderRadius: 3,
                    objectFit: "cover",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />

                {/* Side Images Stack */}
                <Box
                  sx={{
                    width: "38%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=400&h=300&fit=crop"
                    alt="Travel Bus"
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 2,
                      objectFit: "cover",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  />
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop"
                    alt="Travel Destination"
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 2,
                      objectFit: "cover",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  />
                </Box>
              </Box>
            </AnimatedSection>
          </Grid>

          {/* Right Side - Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
              <SectionHeader
                title="Your Trusted Travel Partner"
                subtitle="Trip Travel & Tours Agency makes booking trips simple and seamless. Easily book flights, hotels, and travel services through a secure platform designed for convenience and peace of mind."
                align="left"
                containerSx={{ mb: 4 }}
              />
            </AnimatedSection>

            <AnimatedSection animation="fadeRight" duration={0.8} delay={0}>
              {/* Features List */}
              <Box sx={{ mb: 4 }}>
                {/* Feature 1 */}
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
                  <Box
                    sx={{
                      bgcolor: "rgba(33, 243, 145, 0.1)",
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <VerifiedUserIcon
                      sx={{ color: "success.main", fontSize: "1.5rem" }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Safe & Secure
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#757575", fontSize: "0.875rem" }}
                    >
                      Your bookings are protected by industry-standard security
                      and reliable systems you can trust.
                    </Typography>
                  </Box>
                </Box>

                {/* Feature 2 */}
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
                  <Box
                    sx={{
                      bgcolor: "rgba(33, 243, 145, 0.1)",
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <StarIcon
                      sx={{ color: "success.main", fontSize: "1.5rem" }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Seamless Bookings
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#757575", fontSize: "0.875rem" }}
                    >
                      Plan and book your travel quickly and effortlessly —
                      anytime, anywhere.
                    </Typography>
                  </Box>
                </Box>

                {/* Feature 3 */}
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
                  <Box
                    sx={{
                      bgcolor: "rgba(33, 243, 145, 0.1)",
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SupportAgentIcon
                      sx={{ color: "success.main", fontSize: "1.5rem" }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                      24/7 Support
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#757575", fontSize: "0.875rem" }}
                    >
                      Our dedicated support team is always available to assist with your travel needs.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </AnimatedSection>

            {/* CTA Button */}
            <AnimatedSection animation="fadeRight" duration={0.8} delay={0.1}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  document.getElementById("video")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                sx={{
                  width: { xs: "100%", md: "auto" },
                  px: 4,
                  py: 1.5,
                  borderRadius: 25,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    borderColor: "primary.dark",
                    bgcolor: "rgba(33, 150, 243, 0.04)",
                  },
                }}
              >
                Learn More
              </Button>
            </AnimatedSection>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
