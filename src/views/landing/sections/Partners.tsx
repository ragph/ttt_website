import { Box, Container } from "@mui/material";
import { SectionHeader } from "../components/SectionHeader";
import { AnimatedSection } from "../components/AnimatedSection";

export const Partners = () => {
  const partners = [
    {
      name: "Amadeus",
      logo: "/images/amadeus.png",
      alt: "Amadeus",
    },
    {
      name: "UnionBank",
      logo: "/images/ub.png",
      alt: "UnionBank",
    },
    {
      name: "Wise",
      logo: "/images/wise.png",
      alt: "Wise",
    },
    {
      name: "QAsia",
      logo: "/images/qasia.png",
      alt: "QAsia",
    },
    {
      name: "Travelport",
      logo: "/images/travelport.png",
      alt: "Travelport",
    },
    {
      name: "Paymongo",
      logo: "/images/paymongo.png",
      alt: "Paymongo",
    },
    {
      name: "Dragonpay",
      logo: "/images/dragonpay.png",
      alt: "Dragonpay",
    },
    {
      name: "Travelopro",
      logo: "/images/travelopro.png",
      alt: "Travelopro",
    },
  ];

  return (
    <Box
      id="partners"
      sx={{
        py: { xs: 6, md: 12 },
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Title */}
        <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
          <SectionHeader
            title="Our Trusted Partners"
            align="center"
            containerSx={{ mb: 6 }}
          />
        </AnimatedSection>

        {/* Partner Logos Grid */}
        <AnimatedSection animation="scaleUp" duration={0.8} delay={0.1}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
                md: "repeat(4, 2fr)",
              },
              gap: { xs: 4, md: 6 },
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {partners.map((partner, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: { xs: 60, md: 80 },
                  opacity: 0.6,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Box
                  component="img"
                  src={partner.logo}
                  alt={partner.alt}
                  sx={{
                    maxWidth: { xs: "50%", md: "80%" },
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    filter: "grayscale(100%)",
                    transition: "filter 0.3s ease",
                    "&:hover": {
                      filter: "grayscale(0%)",
                    },
                  }}
                  onError={(e: any) => {
                    e.target.style.opacity = "0.3";
                    e.target.alt = partner.name;
                  }}
                />
              </Box>
            ))}
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
};
