import { Box, Container, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
// @ts-ignore - Will be installed
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore - Will be installed
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { DestinationCard } from "../components/DestinationCard";
import { SectionHeader } from "../components/SectionHeader";
import { AnimatedSection } from "../components/AnimatedSection";
import { ROUTES } from "@/utils/constants";

const destinations = [
  {
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    title: "Eiffel Tower",
    country: "France",
    flag: "🇫🇷",
    price: "899",
    rating: 4.9,
    countryCode: "fr",
  },
  {
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
    title: "Burj Khalifa",
    country: "Dubai",
    flag: "🇦🇪",
    price: "1299",
    rating: 4.8,
    countryCode: "ae",
  },
  {
    image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800",
    title: "London Bridge",
    country: "United Kingdom",
    flag: "🇬🇧",
    price: "799",
    rating: 4.7,
    countryCode: "gb",
  },
  {
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    title: "Statue of Liberty",
    country: "United States",
    flag: "🇺🇸",
    price: "1099",
    rating: 4.9,
    countryCode: "us",
  },
  {
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
    title: "Sydney Opera House",
    country: "Australia",
    flag: "🇦🇺",
    price: "1499",
    rating: 4.8,
    countryCode: "au",
  },
  {
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800",
    title: "Colosseum",
    country: "Italy",
    flag: "🇮🇹",
    price: "699",
    rating: 4.9,
    countryCode: "it",
  },
  {
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
    title: "Sagrada Familia",
    country: "Spain",
    flag: "🇪🇸",
    price: "649",
    rating: 4.8,
    countryCode: "es",
  },
  {
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800",
    title: "Tokyo Tower",
    country: "Japan",
    flag: "🇯🇵",
    price: "999",
    rating: 4.7,
    countryCode: "jp",
  },
];

export const Explore = () => {
  const navigate = useNavigate();

  const handleViewMap = () => {
    navigate(ROUTES.MAP);
  };

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
          <AnimatedSection animation="fadeRight" duration={0.8} delay={0.1}>
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
          </AnimatedSection>
        </Box>
      </Container>

      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Swiper Carousel */}
        <Box>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
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
            {destinations.map((destination, index) => (
              <SwiperSlide key={index}>
                <DestinationCard {...destination} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};
