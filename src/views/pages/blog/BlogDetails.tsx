import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Chip,
  Button,
  Paper,
  CircularProgress,
  IconButton,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import ShareIcon from "@mui/icons-material/Share";
import { blogApi } from "@/api/blogApi";
import type { Blog } from "@/api/types/blog.types";

// Helper to strip HTML tags for meta description
const stripHtml = (html: string): string => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

// Helper to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Decode base36 ID back to number
const decodeId = (encoded: string): string => {
  return parseInt(encoded, 36).toString();
};

const BlogDetails = () => {
  const { id } = useParams<{ category: string; id: string; title: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBlog = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      const blogId = decodeId(id);

      setLoading(true);
      const blog = await blogApi.getBlogById(blogId);

      if (blog) {
        setArticle(blog);
        setError(false);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  // Update meta tags when article is loaded
  useEffect(() => {
    if (!article) return;

    const originalTitle = document.title;
    const description = article.excerpt || stripHtml(article.description).substring(0, 160);
    const currentUrl = window.location.href;

    // Update document title
    document.title = `${article.title} | TTT Travel`;

    // Helper to set or create meta tag
    const setMetaTag = (name: string, content: string, property?: boolean) => {
      const attr = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    setMetaTag("description", description);
    setMetaTag("author", article.author);

    // Open Graph meta tags (for Facebook, LinkedIn, etc.)
    setMetaTag("og:title", article.title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:image", article.image, true);
    setMetaTag("og:url", currentUrl, true);
    setMetaTag("og:type", "article", true);
    setMetaTag("og:site_name", "TTT Travel", true);

    // Twitter Card meta tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", article.title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", article.image);

    // Article-specific meta tags
    setMetaTag("article:published_time", article.datePosted, true);
    setMetaTag("article:author", article.author, true);
    setMetaTag("article:section", article.category, true);

    // Cleanup: restore original title when component unmounts
    return () => {
      document.title = originalTitle;
    };
  }, [article]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4">Article not found</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 350, md: 450 },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={article.image}
          alt={article.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            py: 3,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              color: "white",
              alignSelf: "flex-start",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Back to Home
          </Button>
          <Box>
            <Chip
              label={article.category}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                fontWeight: 600,
                mb: 2,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                lineHeight: 1.2,
              }}
            >
              {article.title}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  src={article.authorImage || undefined}
                  sx={{ width: 40, height: 40 }}
                >
                  <PersonIcon />
                </Avatar>
                <Typography sx={{ color: "white", fontWeight: 500 }}>
                  {article.author}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CalendarTodayIcon sx={{ color: "white", fontSize: 18 }} />
                <Typography sx={{ color: "white" }}>
                  {formatDate(article.datePosted)}
                </Typography>
              </Box>
              <IconButton
                onClick={handleShareClick}
                size="small"
                sx={{
                  color: "white",
                  // bgcolor: "rgba(255,255,255,0.15)",
                  ml: 'auto',
                  p: 0.5,
                  "&:hover": {
                    // bgcolor: "rgba(255,255,255,0.25)",
                  },
                }}
              >
                <ShareIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      {/* Content Section */}
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >

          {/* Excerpt/Summary */}
          {article.excerpt && (
            <Typography
              variant="body1"
              sx={{
                fontStyle: "italic",
                color: "text.secondary",
                lineHeight: 1.8,
                mb: 4,
                pb: 4,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              {article.excerpt}
            </Typography>
          )}

          <Box
            sx={{
              "& h2": {
                fontSize: "1.2rem",
                fontWeight: 600,
                mt: 4,
                mb: 2,
                color: "text.primary",
              },
              "& p": {
                fontSize: "1rem",
                lineHeight: 1.8,
                mb: 2,
                color: "text.secondary",
              },
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: 2,
                my: 2,
              },
              "& ul, & ol": {
                pl: 3,
                mb: 2,
                color: "text.secondary",
              },
              "& li": {
                mb: 1,
                lineHeight: 1.8,
              },
            }}
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        </Paper>

        {/* Back Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              borderRadius: 999,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Back to All Articles
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogDetails;
