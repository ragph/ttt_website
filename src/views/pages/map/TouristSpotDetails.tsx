import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { regionalData } from "./data/RegionalData";
import { touristSpotApi } from "../../../api/touristSpotApi";
import type { TouristSpotDetail } from "../../../api/types/touristSpot.types";

// Placeholder image for missing images
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400";

const TouristSpotDetails = () => {
  const { regionName, province, spotName } = useParams<{
    regionName: string;
    province: string;
    spotName: string;
  }>();
  const navigate = useNavigate();

  // State management
  const [touristSpot, setTouristSpot] = useState<TouristSpotDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tourist spot data
  useEffect(() => {
    const fetchTouristSpot = async () => {
      if (!regionName || !province || !spotName) {
        setError("Missing required parameters");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await touristSpotApi.getTouristSpot({
          regionName,
          province,
          spotName,
        });

        if (response.success) {
          setTouristSpot(response.data);
        } else {
          setError(response.message || "Failed to load tourist spot");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error fetching tourist spot:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTouristSpot();
  }, [regionName, province, spotName]);

  // Scroll to top when component mounts or params change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [regionName, province, spotName]);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Error state
  if (error || !touristSpot) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: { xs: 4, md: 8 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 4,
              fontSize: { xs: "1.5rem", md: "2.125rem" },
            }}
          >
            {error || "Tourist spot not found"}
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/map")}
              sx={{
                textTransform: "none",
                px: 4,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              Back to Map
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  // Get region data for additional spots
  const region = regionalData.find((r) => r.region === touristSpot.region);

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "clip",
      }}
    >
      {/* Hero Image Carousel - Full Width */}
      <Box
        sx={{
          width: "100%",
          height: { xs: 300, sm: 400, md: 500 },
          position: "relative",
          "& .swiper": {
            height: "100%",
          },
          "& .swiper-button-next, & .swiper-button-prev": {
            color: "white",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            "&:after": {
              fontSize: "20px",
              fontWeight: "bold",
            },
            "&:hover": {
              transform: "scale(1.1)",
            },
          },
          "& .swiper-button-prev": {
            left: { xs: "8px", md: "16px" },
          },
          "& .swiper-button-next": {
            right: { xs: "8px", md: "16px" },
          },
          "& .swiper-pagination": {
            bottom: "16px",
          },
          "& .swiper-pagination-bullet": {
            width: "10px",
            height: "10px",
            backgroundColor: "white",
            opacity: 0.5,
            transition: "all 0.3s ease",
          },
          "& .swiper-pagination-bullet-active": {
            width: "30px",
            borderRadius: "5px",
            opacity: 1,
          },
        }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
        >
          {(touristSpot.images && touristSpot.images.length > 0 ? touristSpot.images : [PLACEHOLDER_IMAGE]).map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={image || PLACEHOLDER_IMAGE}
                alt={`${touristSpot.name} - Image ${index + 1}`}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = PLACEHOLDER_IMAGE;
                }}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 4, md: 8 },
          flex: 1,
        }}
      >
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Left Column - Title and Description */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box>
              {/* Title */}
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  color: "text.primary",
                  lineHeight: 1.2,
                }}
              >
                {touristSpot.name}
              </Typography>

              {/* Full Description */}
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  fontSize: { xs: "0.9375rem", md: "1rem" },
                  color: "text.secondary",
                }}
                dangerouslySetInnerHTML={{ __html: touristSpot.description }}
              />
            </Box>
          </Grid>

          {/* Right Column - Travel Facts Sidebar */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "transparent",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  color: "text.primary",
                }}
              >
                Travel Facts
              </Typography>

              {/* Location */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "text.primary",
                    mb: 1,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Location
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "0.9375rem", md: "1rem" },
                    color: "text.secondary",
                  }}
                >
                  {touristSpot.province}, {touristSpot.region}
                </Typography>
              </Box>

              {/* Address */}
              {touristSpot.address && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "text.primary",
                      mb: 1,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Address
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.7,
                      fontSize: { xs: "0.9375rem", md: "1rem" },
                      color: "text.secondary",
                    }}
                  >
                    {touristSpot.address}
                  </Typography>
                </Box>
              )}

              {/* Did You Know? */}
              {touristSpot.trivia && (
                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "text.primary",
                      mb: 1,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Did You Know?
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.7,
                      fontStyle: "italic",
                      fontSize: { xs: "0.9375rem", md: "1rem" },
                      color: "text.secondary",
                    }}
                  >
                    {touristSpot.trivia}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Other Tourist Spots in this Region */}
        {region && region.touristSpots.length > 1 && (
          <Box sx={{ mt: { xs: 6, md: 10 } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 4,
                fontSize: { xs: "1.5rem", md: "2rem" },
                color: "text.primary",
              }}
            >
              Other attractions in {region.region}
            </Typography>

            <Grid container spacing={3}>
              {region.touristSpots
                .filter((spot) => spot.name !== touristSpot.name)
                .map((spot, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <Paper
                      elevation={0}
                      onClick={() =>
                        navigate(
                          `/details/${encodeURIComponent(region.region)}/${encodeURIComponent(spot.province)}/${encodeURIComponent(spot.name)}`
                        )
                      }
                      sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        height: { xs: 320, sm: 350, md: 380 },
                        width: "100%",
                        position: "relative",
                        border: "1px solid",
                        borderColor: "divider",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                          "& .overlay": {
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)",
                          },
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={spot.images && spot.images[0] ? spot.images[0] : PLACEHOLDER_IMAGE}
                        alt={spot.name}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = PLACEHOLDER_IMAGE;
                        }}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
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
                            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)",
                          transition: "background 0.3s ease",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: { xs: 2.5, md: 3 },
                          zIndex: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            mb: 0.5,
                            fontSize: { xs: "1.125rem", md: "1.25rem" },
                            color: "white",
                          }}
                        >
                          {spot.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.85)",
                            fontSize: { xs: "0.875rem", md: "0.9375rem" },
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.5,
                          }}
                        >
                          {spot.description.replace(/<[^>]*>/g, '')}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TouristSpotDetails;
