import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { BlogCard } from "../components/BlogCard";
import { SectionHeader } from "../components/SectionHeader";
import { AnimatedSection } from "../components/AnimatedSection";
import { blogApi } from "@/api/blogApi";
import type { Blog as BlogType, BlogCategory } from "@/api/types/blog.types";

const ITEMS_PER_PAGE = 4;

// Helper to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const Blog = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await blogApi.getCategories();
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  // Fetch blogs when category changes
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const response = await blogApi.getBlogs({
        limit: ITEMS_PER_PAGE,
        offset: 0,
        category: selectedCategory || undefined,
      });
      setBlogs(response.data);
      setHasMore(response.meta.hasMore);
      setLoading(false);
    };

    fetchBlogs();
  }, [selectedCategory]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const response = await blogApi.getBlogs({
      limit: ITEMS_PER_PAGE,
      offset: blogs.length,
      category: selectedCategory || undefined,
    });
    setBlogs((prev) => [...prev, ...response.data]);
    setHasMore(response.meta.hasMore);
    setLoadingMore(false);
  };

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
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
            mb: 4,
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

        {/* Category Filter */}
        {categories.length > 0 && (
          <AnimatedSection animation="fadeUp" duration={0.5} delay={0.1}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mb: 6,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Chip
                label="All"
                onClick={() => handleCategoryChange("")}
                variant={selectedCategory === "" ? "filled" : "outlined"}
                color={selectedCategory === "" ? "primary" : "default"}
                sx={{
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: selectedCategory === "" ? "primary.main" : "action.hover",
                  },
                }}
              />
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.name}
                  onClick={() => handleCategoryChange(category.name)}
                  variant={selectedCategory === category.name ? "filled" : "outlined"}
                  color={selectedCategory === category.name ? "primary" : "default"}
                  sx={{
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor:
                        selectedCategory === category.name
                          ? "primary.main"
                          : "action.hover",
                    },
                  }}
                />
              ))}
            </Stack>
          </AnimatedSection>
        )}

        {/* Loading State */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 300,
            }}
          >
            <CircularProgress />
          </Box>
        ) : blogs.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 300,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {selectedCategory
                ? `No blog posts found in "${selectedCategory}" category.`
                : "No blog posts available yet. Check back soon!"}
            </Typography>
          </Box>
        ) : (
          <>
            {/* Blog Cards Grid */}
            <Grid container spacing={3}>
              {blogs.map((blog, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={blog.id}>
                  <AnimatedSection
                    animation="fadeUp"
                    duration={0.5}
                    delay={0.05 * (index % ITEMS_PER_PAGE)}
                  >
                    <BlogCard
                      id={blog.id.toString()}
                      image={blog.image}
                      title={blog.title}
                      excerpt={
                        blog.description.replace(/<[^>]*>/g, "").substring(0, 150) +
                        "..."
                      }
                      category={blog.category}
                      date={formatDate(blog.datePosted)}
                      author={blog.author}
                      authorAvatar={blog.authorImage || undefined}
                    />
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
              {hasMore ? (
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  endIcon={
                    loadingMore ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <ExpandMoreIcon />
                    )
                  }
                  sx={{
                    borderRadius: 999,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {loadingMore ? "Loading..." : "Load More Articles"}
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
                  <Typography variant="body1" color="text.secondary">
                    You've reached the end. Stay tuned for more articles!
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};
