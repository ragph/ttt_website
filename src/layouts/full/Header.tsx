import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  Button,
  Link,
  Container,
  Stack,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { SvgIcon } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

// Custom TikTok Icon component
const TikTokIcon = (props: React.ComponentProps<typeof SvgIcon>) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </SvgIcon>
);
import { toggleTheme } from "../../features/theme/themeSlice";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { getInitials } from "../../utils/helpers";

interface HeaderProps {
  toggleMobileSidebar: () => void;
}

interface NavLink {
  label: string;
  href: string;
}

const Header = ({ toggleMobileSidebar }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const user = useAppSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>("#hero");

  const isLandingPage = location.pathname === "/";

  // Navigation links for landing page
  const navLinks: NavLink[] = useMemo(
    () => [
      { label: "Home", href: "#hero" },
      { label: "Explore", href: "/map" },
      { label: "Blog", href: "#blog" },
      { label: "Surveys", href: "/surveys" },
      { label: "Announcements", href: "/announcements" },
      { label: "Subscriptions", href: "/subscriptions" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleSettings = () => {
    navigate("/settings");
    handleMenuClose();
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      // If we're on the landing page, scroll to section
      if (isLandingPage) {
        const element = document.querySelector(href);
        if (element) {
          // Calculate header height offset (top bar ~40px + toolbar ~80px + buffer ~20px)
          const isMobile = window.innerWidth < 600;
          const headerOffset = isMobile ? 100 : 140;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        // If we're on another page, navigate to landing page with hash
        navigate(`/${href}`);
      }
    } else {
      // Regular route navigation
      navigate(href);
    }
  };

  // Scroll to section from hash on page load
  useEffect(() => {
    if (isLandingPage && location.hash) {
      // Small delay to ensure page is loaded
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          // Calculate header height offset (top bar ~40px + toolbar ~80px + buffer ~20px)
          const isMobile = window.innerWidth < 600;
          const headerOffset = isMobile ? 100 : 140;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [isLandingPage, location.hash]);

  // Detect active section on scroll
  useEffect(() => {
    if (!isLandingPage) return;

    const handleScroll = () => {
      // Only get hash links (exclude regular routes like /map)
      const sections = navLinks
        .filter((link) => link.href.startsWith("#"))
        .map((link) => link.href);
      let currentSection = sections[0]; // Default to first section

      // Calculate header height (top bar ~40px + main toolbar ~80px = ~120px on desktop)
      // On mobile, top bar is hidden, so ~80px
      const isMobile = window.innerWidth < 600;
      const headerOffset = isMobile ? 100 : 140;

      // Find the section that is currently in view
      for (const sectionId of sections) {
        const section = document.querySelector(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Section is in view if its top is within the viewport (accounting for header)
          if (rect.top <= headerOffset && rect.bottom > headerOffset) {
            currentSection = sectionId;
            break;
          }
          // If we're past this section, it might be the active one
          if (rect.top <= headerOffset) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLandingPage, navLinks]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        bgcolor: "background.paper",
        borderRadius: 0,
      }}
    >
      {/* Top Bar with Contact Info and Social Links */}
      <Box
        sx={{
          bgcolor: "primary.main",
          borderBottom: 1,
          borderColor: "divider",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1,
              px: { xs: 2, sm: 3 },
            }}
          >
            {/* Contact Info */}
            <Stack
              direction="row"
              spacing={{ xs: 1.5, sm: 3 }}
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
              }}
            >
              <Link
                href="tel:+6328683-6213"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "white",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                <PhoneIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">+632-8683-6213</Typography>
              </Link>
              <Link
                href="mailto:contact@triptravelandtours.com"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "white",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                <EmailIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">
                  contact@triptravelandtours.com
                </Typography>
              </Link>
            </Stack>

            {/* Social Links */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ ml: "auto", alignItems: "center" }}
            >
              <Button
                component="a"
                href="https://etapp.triptravelandtours.com"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: "white",
                  bgcolor: "rgba(255, 255, 255, 0.15)",
                  textTransform: "none",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  px: 1.5,
                  py: 0.25,
                  minHeight: "auto",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.25)",
                  },
                }}
              >
                Login to App
              </Button>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ bgcolor: "rgba(255, 255, 255, 0.3)", mx: 0.5 }}
              />
              <IconButton
                component="a"
                href="https://www.facebook.com/profile.php?id=61555167518114"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <FacebookIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.tiktok.com/@earningwhiletravellingph?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <TikTokIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <InstagramIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.youtube.com/@earningwhiletravelling2026"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <YouTubeIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Main Navigation Bar */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar sx={{ justifyContent: "space-between", py: 2, px: 0 }}>
            {/* Logo/Title */}
            <Box
              component="a"
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                flexShrink: 1,
                minWidth: 0,
                // maxWidth: { xs: "60%", sm: "auto" },
              }}
            >
              <Box
                component="img"
                src="/images/ttt.png"
                alt="TTT Logo"
                sx={{
                  height: 40,
                  width: "auto",
                  flexShrink: 0,
                  marginRight: 1,
                }}
                onError={(e: any) => {
                  e.target.style.display = "none";
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: themeMode === "dark" ? "white" : "#0B5290",
                  fontWeight: 900,
                  fontSize: { xs: ".9rem", sm: "1.2rem" },
                  letterSpacing: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  // textOverflow: "ellipsis",
                  lineHeight: 1.5,
                }}
              >
                Trip Travel & Tours Agency
              </Typography>
            </Box>

            {/* Center Navigation Links - Always visible */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3,
              }}
            >
              {navLinks.map((link) => {
                // Check if active based on hash (for landing page sections) or pathname (for routes)
                const isActive = link.href.startsWith("#")
                  ? isLandingPage && activeSection === link.href
                  : location.pathname === link.href;
                return (
                  <Box
                    key={link.label}
                    sx={{
                      position: "relative",
                      pb: 0.5,
                    }}
                  >
                    <Link
                      onClick={() => handleNavClick(link.href)}
                      sx={{
                        color: isActive ? "primary.main" : "text.primary",
                        textDecoration: "none",
                        fontSize: "0.95rem",
                        fontWeight: isActive ? 700 : 600,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                    {/* Active indicator - Yellow line */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: -2,
                        left: 0,
                        right: 0,
                        height: "3px",
                        bgcolor: "#FDE047",
                        borderRadius: "2px 2px 0 0",
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "center",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </Box>
                );
              })}
            </Box>

            {/* Right side icons */}

            {/* Mobile menu toggle */}
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileSidebar}
              sx={{ display: { lg: "none" }, color: "text.primary" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Header;
