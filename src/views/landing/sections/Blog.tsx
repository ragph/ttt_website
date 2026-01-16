import { Box, Container, Grid, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BlogCard } from "../components/BlogCard";
import { SectionHeader } from "../components/SectionHeader";
import { AnimatedSection } from "../components/AnimatedSection";

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
];

export const Blog = () => {
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
          <AnimatedSection animation="fadeRight" duration={0.8} delay={0.1}>
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              size="medium"
              endIcon={<ArrowForwardIcon />}
              sx={{
                ml: "auto",
                borderRadius: 999,
                textTransform: "none",
                alignSelf: "flex-start",
              }}
            >
              View All
            </Button>
          </AnimatedSection>
        </Box>

        {/* Articles Grid */}
        <Grid container spacing={4}>
          {articles.map((article, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <BlogCard {...article} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
