import { useState } from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../full/Header";
import Sidebar from "../full/Sidebar";
import { Footer } from "../../views/landing/sections/Footer";

const BlankLayout = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Header */}
      <Header toggleMobileSidebar={toggleMobileSidebar} />

      {/* Page Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Container maxWidth={false} disableGutters>
          <Outlet />
        </Container>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Sidebar - only shows on mobile when menu is clicked */}
      <Sidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        mobileOnly={true}
      />
    </Box>
  );
};

export default BlankLayout;
