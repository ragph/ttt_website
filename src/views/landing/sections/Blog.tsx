import { Box, Container } from "@mui/material";
import { BlogCard } from "../components/BlogCard";
import { SectionHeader } from "../components/SectionHeader";
import { AnimatedSection } from "../components/AnimatedSection";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const articles = [
  {
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    title: "10 Essential Travel Tips for First-Time Backpackers",
    excerpt:
      "Planning your first backpacking adventure? Learn the essential tips that will make your journey smooth and memorable.",
    category: "Travel Tips",
    date: "Nov 20, 2024",
    author: "Sarah Johnson",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    title: "How to Maximize Your ET Credits While Traveling",
    excerpt:
      "Discover proven strategies to earn more ET credits on your trips and turn your travels into substantial rewards.",
    category: "Rewards",
    date: "Nov 18, 2024",
    author: "Michael Chen",
    authorAvatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800",
    title: "Hidden Gems: 5 Underrated Destinations in Southeast Asia",
    excerpt:
      "Explore breathtaking destinations that most tourists miss. These hidden gems offer authentic experiences.",
    category: "Destinations",
    date: "Nov 15, 2024",
    author: "Emma Davis",
    authorAvatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
    title: "The Complete Guide to Budget Travel in Europe",
    excerpt:
      "Travel Europe without breaking the bank. Our comprehensive guide covers accommodation, transportation, and dining tips.",
    category: "Guide",
    date: "Nov 12, 2024",
    author: "David Wilson",
    authorAvatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    title: "Beach Paradise: Top 10 Coastal Destinations",
    excerpt:
      "From pristine white sands to crystal-clear waters, discover the world's most stunning beach destinations.",
    category: "Destinations",
    date: "Nov 10, 2024",
    author: "Lisa Park",
    authorAvatar: "https://i.pravatar.cc/150?img=16",
  },
  {
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    title: "Adventure Travel: Thrilling Experiences Await",
    excerpt:
      "Push your limits with these adrenaline-pumping adventures around the globe. From bungee jumping to skydiving.",
    category: "Adventure",
    date: "Nov 8, 2024",
    author: "Jake Thompson",
    authorAvatar: "https://i.pravatar.cc/150?img=18",
  },
];

export const Blog = () => {
  return (
    <Box
      id="blog"
      sx={{
        py: { xs: 8, md: 20 },
        bgcolor: "background.paper",
        overflow: "hidden",
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
              badge="TRAVEL BLOG"
              badgeColor="#1b60ff"
              title="News, Tips, Guides Articles"
              align="left"
              containerSx={{ mb: 0, flex: 1 }}
            />
          </AnimatedSection>
        </Box>
      </Container>

      {/* Infinite Scrolling Blog Cards */}
      <Box sx={{ px: { xs: 2, md: 4 } }}>
        <Swiper
          spaceBetween={24}
          slidesPerView={1.2}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            900: {
              slidesPerView: 3.2,
            },
            1200: {
              slidesPerView: 4.2,
            },
          }}
          style={{
            width: "100%",
            paddingBottom: "24px",
          }}
        >
          {articles.map((article, index) => (
            <SwiperSlide key={index}>
              <BlogCard {...article} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
