import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import TableChartIcon from "@mui/icons-material/TableChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import WidgetsIcon from "@mui/icons-material/Widgets";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import ExploreIcon from "@mui/icons-material/Explore";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CampaignIcon from "@mui/icons-material/Campaign";
import CloseIcon from "@mui/icons-material/Close";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { ROUTES } from "../../utils/constants";

const DRAWER_WIDTH = '100%';

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  mobileOnly?: boolean;
}

interface MenuItem {
  title: string;
  icon: React.ReactElement;
  href: string;
}

const dashboardMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    href: ROUTES.DASHBOARD,
  },
  {
    title: "Profile",
    icon: <PersonIcon />,
    href: ROUTES.PROFILE,
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    href: ROUTES.SETTINGS,
  },
  {
    title: "Users Table",
    icon: <TableChartIcon />,
    href: ROUTES.USERS_TABLE,
  },
  {
    title: "Analytics",
    icon: <BarChartIcon />,
    href: ROUTES.ANALYTICS,
  },
  {
    title: "Widgets",
    icon: <WidgetsIcon />,
    href: "/widgets",
  },
  {
    title: "UI Components",
    icon: <SmartButtonIcon />,
    href: ROUTES.UI_BUTTONS,
  },
];

const landingPageMenuItems: MenuItem[] = [
  {
    title: "Home",
    icon: <HomeIcon />,
    href: "#hero",
  },
  {
    title: "Explore",
    icon: <ExploreIcon />,
    href: "/map",
  },
  {
    title: "Blog",
    icon: <ArticleIcon />,
    href: "#blog",
  },
  {
    title: "Surveys",
    icon: <ContactMailIcon />,
    href: "/surveys",
  },
  {
    title: "Announcements",
    icon: <CampaignIcon />,
    href: "/announcements",
  },
  {
    title: "Subscriptions",
    icon: <CardMembershipIcon />,
    href: "/subscriptions",
  },
  {
    title: "Contact",
    icon: <ContactMailIcon />,
    href: "#contact",
  },
];

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  mobileOnly = false,
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const isLandingPage = location.pathname === "/";
  // const menuItems = isLandingPage ? landingPageMenuItems : dashboardMenuItems;
  const menuItems = landingPageMenuItems;

  const [activeSection, setActiveSection] = useState<string>("#hero");

  // Scroll to section from hash on page load
  useEffect(() => {
    if (isLandingPage && location.hash) {
      // Small delay to ensure page is loaded
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [isLandingPage, location.hash]);

  // Detect active section on scroll for landing page
  useEffect(() => {
    if (!isLandingPage) return;

    const handleScroll = () => {
      // Only get hash links (exclude regular routes like /map)
      const sections = landingPageMenuItems
        .filter((link) => link.href.startsWith("#"))
        .map((link) => link.href);
      let currentSection = sections[0]; // Default to first section

      // Find the section that is currently in view
      for (const sectionId of sections) {
        const section = document.querySelector(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Section is in view if its top is within the viewport (accounting for header)
          if (rect.top <= 150 && rect.bottom > 150) {
            currentSection = sectionId;
            break;
          }
          // If we're past this section, it might be the active one
          if (rect.top <= 150) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLandingPage]);

  const handleNavigation = (href: string) => {
    // Handle smooth scroll for landing page section links
    if (href.startsWith("#")) {
      // If we're on the landing page, scroll to section
      if (isLandingPage) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // If we're on another page, navigate to landing page with hash
        navigate(`/${href}`);
      }
    } else {
      navigate(href);
    }
    if (isMobile) {
      onSidebarClose();
    }
  };

  const SidebarContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <Box sx={{ px: 2, py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* <Box
              component="img"
              src="/images/ttt.png"
              alt="ET Logo"
              sx={{
                height: 40,
                width: "auto",
              }}
              onError={(e: any) => {
                e.target.style.display = "none";
              }}
            /> */}
            {/* <Typography
              variant="h6"
              component="div"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: "0.95rem",
              }}
            >
              Earning While Travelling
            </Typography> */}
          </Box>
          {(isMobile || mobileOnly) && (
            <IconButton
              onClick={onSidebarClose}
              sx={{
                color: "text.secondary",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ px: 2, flexGrow: 1 }}>
        <List>
          {menuItems.map((item) => {
            // Only show active state on landing page
            const isActive = isLandingPage && activeSection === item.href;
            return (
              <ListItemButton
                key={item.title}
                onClick={() => handleNavigation(item.href)}
                selected={isActive}
                sx={{
                  py: 1.8,
                  mb: 0.5,
                  borderRadius: "8px",
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                }}
              >
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    textAlign: 'center',
                    fontSize: "1rem",
                    fontWeight: isActive ? 700 : 600,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      {/* <Box sx={{ p: 3, borderTop: 1, borderColor: "divider" }}>
        <Typography variant="caption" color="text.secondary">
          © 2024 TemplateReactTS v1.0
        </Typography>
      </Box> */}
    </Box>
  );

  if (isMobile || mobileOnly) {
    return (
      <Drawer
        anchor="right"
        open={isMobileSidebarOpen}
        onClose={onSidebarClose}
        variant="temporary"
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            bgcolor: "background.paper",
            borderRadius: 0,
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }

  // return (
  //   <Drawer
  //     anchor="right"
  //     open
  //     variant="permanent"
  //     PaperProps={{
  //       sx: {
  //         width: DRAWER_WIDTH,
  //         bgcolor: "background.paper",
  //         borderLeft: 1,
  //         borderColor: "divider",
  //       },
  //     }}
  //   >
  //     {SidebarContent}
  //   </Drawer>
  // );
};

export default Sidebar;
