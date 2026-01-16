import { useState } from "react";
import { Box, Container, Grid, Button, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { BlogCard } from "../components/BlogCard";
import { SectionHeader } from "../components/SectionHeader";
import { AnimatedSection } from "../components/AnimatedSection";

const articles = [
  {
    id: "10-essential-travel-tips-for-first-time-backpackers",
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
    id: "how-to-maximize-your-et-credits-while-traveling",
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
    id: "hidden-gems-5-underrated-destinations-in-southeast-asia",
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
    id: "the-complete-guide-to-budget-travel-in-europe",
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
    id: "beach-paradise-top-10-coastal-destinations",
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
    id: "adventure-travel-thrilling-experiences-await",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    title: "Adventure Travel: Thrilling Experiences Await",
    excerpt:
      "Push your limits with these adrenaline-pumping adventures around the globe. From bungee jumping to skydiving.",
    category: "Adventure",
    date: "Nov 8, 2024",
    author: "Jake Thompson",
    authorAvatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: "road-trip-essentials-everything-you-need-to-know",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    title: "Road Trip Essentials: Everything You Need to Know",
    excerpt:
      "Hit the open road with confidence. Our comprehensive guide covers planning, packing, and staying safe on your journey.",
    category: "Guide",
    date: "Nov 5, 2024",
    author: "Anna Martinez",
    authorAvatar: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: "solo-travel-a-journey-of-self-discovery",
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800",
    title: "Solo Travel: A Journey of Self-Discovery",
    excerpt:
      "Embrace the freedom of traveling alone. Tips for staying safe, meeting people, and making the most of your solo adventure.",
    category: "Travel Tips",
    date: "Nov 3, 2024",
    author: "Chris Anderson",
    authorAvatar: "https://i.pravatar.cc/150?img=22",
  },
  {
    id: "mountain-retreats-best-alpine-destinations",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    title: "Mountain Retreats: Best Alpine Destinations",
    excerpt:
      "Escape to the mountains for breathtaking views and fresh air. Discover the world's most stunning alpine retreats.",
    category: "Destinations",
    date: "Nov 1, 2024",
    author: "Emily Brown",
    authorAvatar: "https://i.pravatar.cc/150?img=24",
  },
  {
    id: "cultural-immersion-travel-like-a-local",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800",
    title: "Cultural Immersion: Travel Like a Local",
    excerpt:
      "Go beyond tourist spots and experience authentic local culture. Learn how to connect with communities worldwide.",
    category: "Travel Tips",
    date: "Oct 28, 2024",
    author: "Marcus Lee",
    authorAvatar: "https://i.pravatar.cc/150?img=26",
  },
];

const ITEMS_PER_PAGE = 4;

export const Blog = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < articles.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, articles.length));
  };

  return (
    <Box
      id="blog"
      sx={{
        py: { xs: 8, md: 20 },
        bgcolor: "background.paper",
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

        {/* Blog Cards Grid */}
        <Grid container spacing={3}>
          {visibleArticles.map((article, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <AnimatedSection animation="fadeUp" duration={0.5} delay={0.05 * (index % ITEMS_PER_PAGE)}>
                <BlogCard {...article} />
              </AnimatedSection>
            </Grid>
          ))}
        </Grid>

        {/* Load More Button or End Message */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 6,
            gap: 1,
          }}
        >
          {hasMoreArticles ? (
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleLoadMore}
              endIcon={<ExpandMoreIcon />}
              sx={{
                borderRadius: 999,
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Load More Articles
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
                py: 2,
              }}
            >
              <CheckCircleOutlineIcon sx={{ color: "success.main" }} />
              <Typography variant="body1" color="text.secondary">
                You've reached the end. Stay tuned for more articles!
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};
