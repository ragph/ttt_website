import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AnimatedSection } from "../components/AnimatedSection";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box
      id="hero"
      sx={{
        // minHeight: '95vh',
        // background: 'linear-gradient(135deg, #E3F2FD 0%, #90CAF9 50%, #64B5F6 100%)',
        background:
          "linear-gradient(135deg, #E8F4F8 0%, #D1E9F6 50%, #4fb7ff 100%)",
        pt: { xs: 8, md: 8 },
        pb: { xs: 8, md: 8 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 3 }} alignItems="center">
          {/* Left Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedSection animation="fadeUp" duration={0.6} delay={0}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.4rem", sm: "3rem", md: "3.8rem" },
                  fontWeight: 800,
                  color: "#1a1a1a",
                  mb: 2,
                  lineHeight: 1.2,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                World Tourism is our{" "}
                <Box
                  component="span"
                  sx={{
                    color: "primary.main",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  Business
                  <Box
                    component="sup"
                    sx={{
                      fontSize: "0.4em",
                      color: "primary.main",
                      fontWeight: 400,
                    }}
                  >
                    TM
                  </Box>
                </Box>
              </Typography>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" duration={0.6} delay={0.1}>
              <Typography
                variant="body1"
                sx={{
                  color: "#424242",
                  mb: 4,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  lineHeight: 1.7,
                  maxWidth: "480px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Your trusted online travel agency — One app for all your travel needs. Book flights, hotels, and travel services and enjoy exclusive rewards.
              </Typography>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" duration={0.6} delay={0.2}>
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  href="http://etapp.triptravelandtours.com"
                  sx={{
                    px: 4,
                    py: 2,
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
                  Login to App
                </Button>
              </Box>
            </AnimatedSection>

            {/* Trust Badges with Avatar Group */}
            <AnimatedSection animation="fadeUp" duration={0.6} delay={0.3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: 3,
                  mt: 4,
                  flexWrap: "wrap",
                }}
              >
                {/* Avatar Group */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <AvatarGroup
                    max={4}
                    sx={{
                      "& .MuiAvatar-root": {
                        width: 40,
                        height: 40,
                        border: "2px solid white",
                      },
                    }}
                  >
                    <Avatar
                      alt="User 1"
                      src="https://i.pravatar.cc/150?img=1"
                    />
                    <Avatar
                      alt="User 2"
                      src="https://i.pravatar.cc/150?img=2"
                    />
                    <Avatar
                      alt="User 3"
                      src="https://i.pravatar.cc/150?img=3"
                    />
                    <Avatar
                      alt="User 4"
                      src="https://i.pravatar.cc/150?img=4"
                    />
                  </AvatarGroup>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "primary.main",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      10,000+ travelers
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#616161", fontSize: "0.75rem" }}
                    >
                      Trust our service
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </AnimatedSection>
          </Grid>

          {/* Right Illustration */}
          <Grid size={{ xs: 12, md: 6 }}>
            <AnimatedSection animation="fadeRight" duration={0.8} delay={0.2}>
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 300, md: 600 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src="/images/img2.png"
                  alt="Travel Illustration"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
                  }}
                />
              </Box>
            </AnimatedSection>
          </Grid>
        </Grid>
      </Container>

      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: { xs: 60, sm: 80, md: 120 },
          height: { xs: 60, sm: 80, md: 120 },
          borderRadius: "50%",
          background: "rgba(255,255,255,0.3)",
          filter: "blur(50px)",
          display: { xs: "none", sm: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          left: "5%",
          width: { xs: 50, sm: 70, md: 100 },
          height: { xs: 50, sm: 70, md: 100 },
          borderRadius: "50%",
          background: "rgba(33, 150, 243, 0.2)",
          filter: "blur(40px)",
          display: { xs: "none", sm: "block" },
        }}
      />
    </Box>
  );
};
