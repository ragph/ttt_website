import { useState, useEffect } from "react";
import { Box, Container, CircularProgress } from "@mui/material";
// @ts-ignore - Will be installed
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore - Will be installed
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { DestinationCard } from "../components/DestinationCard";
import { SectionHeader } from "../components/SectionHeader";
import { AnimatedSection } from "../components/AnimatedSection";
import { destinationsApi, Destination } from "@/api/destinationsApi";

export const Explore = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      const response = await destinationsApi.getDestinations(20, 0);
      setDestinations(response.data);
      setLoading(false);
    };

    fetchDestinations();
  }, []);

  return (
    <Box
      id="explore"
      sx={{
        py: { xs: 8, md: 20 },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 8,
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <AnimatedSection animation="fadeLeft" duration={0.8} delay={0}>
            <SectionHeader
              badge="EXPLORE DESTINATIONS"
              title="Explore The World's Most Loved Travel"
              subtitle="Discover iconic destinations and start getting rewarded with every booking"
              align="left"
              containerSx={{ mb: 0, flex: 1 }}
            />
          </AnimatedSection>
          {/* <AnimatedSection animation="fadeRight" duration={0.8} delay={0.1}>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              size="medium"
              endIcon={<ArrowForwardIcon />}
              onClick={handleViewMap}
              sx={{
                ml: "auto",
                borderRadius: 999,
                textTransform: "none",
                alignSelf: "flex-start",
              }}
            >
              View Map
            </Button>
          </AnimatedSection> */}
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Swiper Carousel */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : destinations.length > 0 ? (
          <Box>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              pagination={{ clickable: true }}
              loop={destinations.length > 4}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              style={{ paddingBottom: 50 }}
            >
              {destinations.map((destination) => (
                <SwiperSlide key={destination.id}>
                  <DestinationCard
                    image={destination.banner || ''}
                    title={destination.title}
                    country={destination.location}
                    flag="🇵🇭"
                    price=""
                    countryCode="ph"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};
