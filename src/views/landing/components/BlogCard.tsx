import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Avatar,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface BlogCardProps {
  id?: string;
  image: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  authorAvatar?: string;
}

// Helper to create URL-friendly slug
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
};

export const BlogCard = ({
  id,
  image,
  title,
  excerpt,
  category,
  date,
  author,
  authorAvatar,
}: BlogCardProps) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    if (id) {
      const categorySlug = createSlug(category);
      const titleSlug = `${createSlug(title)}-${id}`;
      navigate(`/blog/${categorySlug}/${titleSlug}`);
    }
  };

  return (
    <Card
      onClick={handleReadMore}
      sx={{
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          "& .blog-image": {
            transform: "scale(1.1)",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden", height: 200 }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          className="blog-image"
          sx={{
            transition: "transform 0.3s ease",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
          }}
        >
          <Chip
            label={category}
            sx={{
              bgcolor: "background.paper",
              color: "primary.main",
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
        </Box>
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              src={authorAvatar}
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#1b60ff",
              }}
            >
              <PersonIcon sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography
              variant="caption"
              sx={{ color: "#6B7280", fontWeight: 500 }}
            >
              {author}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: "#6B7280" }}>
              {date}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 2,
            fontSize: "1.125rem",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#6B7280",
            mb: 3,
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {excerpt}
        </Typography>
        <Button
          variant="text"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            handleReadMore();
          }}
        >
          Read More
          <ArrowForwardIcon sx={{ width: 18, ml: 0.5 }} />
        </Button>
      </CardContent>
    </Card>
  );
};
