import { useState } from "react";
import { Box, Container } from "@mui/material";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { WhatWeOffer } from "./sections/WhatWeOffer";
import { HowItWorks } from "./sections/HowItWorks";
import { Categories } from "./sections/Categories";
import { TrendingDestinations } from "./sections/TrendingDestinations";
import { Features } from "./sections/Features";
import { Explore } from "./sections/Explore";
import { Promo } from "./sections/Promo";
import { Partners } from "./sections/Partners";
import { Gallery } from "./sections/Gallery";
import { Video } from "./sections/Video";
import { Blog } from "./sections/Blog";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import Header from "@/layouts/full/Header";
import Sidebar from "@/layouts/full/Sidebar";
import { AnimatedSection } from "./components/AnimatedSection";
import { ScrollToTop } from "./components/ScrollToTop";

const LandingPage = () => {
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
        overflowX: "clip",
        width: "100%",
      }}
    >
      {/* Sidebar - only shows on mobile when menu is clicked */}
      <Sidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        mobileOnly={true}
      />

      {/* Header */}
      <Header toggleMobileSidebar={toggleMobileSidebar} />
      
      {/* Page Content */}
      <Container maxWidth={false} disableGutters sx={{ overflowX: "clip" }}>
        <Box sx={{ width: "100%" }}>
          {/* Hero - No animation (first view) */}
          <Hero />

          {/* Animated Sections */}
          <About />

          {/* <WhatWeOffer /> */}

          <Video />
          
          <Features />

          <Categories />

          {/* <TrendingDestinations /> */}

          <Explore />

          <Promo />

          <HowItWorks />

          <Partners />

          {/* <AnimatedSection animation="fadeUp" duration={0.8} delay={0.1}>
            <Gallery />
          </AnimatedSection> */}


          <Blog />

          <AnimatedSection animation="fadeUp" duration={0.8} delay={0.1}>
            <Contact />
          </AnimatedSection>

          <Footer />
        </Box>
      </Container>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </Box>
  );
};

export default LandingPage;
