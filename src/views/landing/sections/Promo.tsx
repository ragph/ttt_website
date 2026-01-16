import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import { SectionHeader } from "../components/SectionHeader";
import { AnimatedSection } from "../components/AnimatedSection";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export const Promo = () => {
  const promoCards = [
    {
      icon: TrendingUpIcon,
      title: "Traveller",
      subtitle: "Start Exploring, Get Rewarded",
      description:
        "Earn points on every booking and enjoy the essential perks of the platform—perfect for anyone who loves to travel and save.",
      color: "#4CAF50",
      image: "/images/travellers.png",
      price: "FREE",
      priceDetail: 'Subscription',
    },
    {
      icon: CardGiftcardIcon,
      title: "Affiliate",
      subtitle: "Share More, Earn More",
      description:
        "Get rewarded by referring new travelers. The more people you inspire, the more rewards and bonuses you unlock.",
      color: "#FF9800",
      image: "/images/affiliate.png",
      price: "FREE",
      priceDetail: 'Subscription',
    },
    {
      icon: CheckCircleIcon,
      title: "Victors",
      subtitle: "Lead the Pack, Enjoy Elite Rewards",
      description:
        "Our highest tier with premium benefits, top reward multipliers, and exclusive privileges for power users and top performers.",
      color: "#2196F3",
      image: "/images/victors.png",
      price: "₱99/Year Subscription",
      priceDetail: "FREE 1 month trial",
    },
  ];

  return (
    <Box
      id="promo"
      sx={{
        pt: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #FFB800 0%, #ffa500 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
          <SectionHeader
            title={
              <>
                Choose Your Journey,{" "}
                <Typography variant="inherit" color="textPrimary">
                  Unlock Your Rewards
                </Typography>
              </>
            }
            subtitle="Discover a rewards system built for every kind of explorer. Whether you're traveling, sharing, or leading the community, each tier opens new perks, bonuses, and reward potential."
            align="center"
            titleColor="white"
            subtitleColor="rgba(255,255,255,0.95)"
            containerSx={{ mb: 4 }}
          />
        </AnimatedSection>
        <Grid container spacing={{ xs: 4, md: 4 }}>
          {/* Left Image */}
          <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 2, md: 1 } }}>
            <AnimatedSection animation="fadeLeft" duration={0.8} delay={0.2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src="/images/promo.png"
                  alt="Woman with travel gear"
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxWidth: 500,
                    objectFit: "contain",
                  }}
                />
              </Box>
            </AnimatedSection>
          </Grid>

          {/* Right Content */}
          <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 1, md: 2 } }}>
            {/* Promo Cards */}
            <Box sx={{ mb: 0 }}>
              <Grid container spacing={2}>
                {promoCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: "inline-flex", height: { xs: 'auto', md: 500 } }}>
                      <AnimatedSection
                        animation="fadeUp"
                        duration={0.6}
                        delay={0.1 + index * 0.1}
                      >
                        <Paper
                          elevation={2}
                          sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            height: "100%",
                            minHeight: 400,
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            "&:hover": {
                              transform: "scale(1.02)",
                            },
                          }}
                        >
                          {/* Card Image */}
                          <Box
                            component="img"
                            src={card.image}
                            alt={card.title}
                            className="card-image"
                            sx={{
                              width: "100%",
                              height: { xs: 180, sm: 150 },
                              pt: 2,
                              objectFit: "contain",
                              transition: "transform 0.3s ease",
                            }}
                          />

                          {/* Card Content */}
                          <Box sx={{ p: 2, display: "flex", flexDirection: "column", height: "calc(100% - 180px)" }}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  fontSize: { xs: "1.3rem", md: "1.125rem" },
                                }}
                              >
                                {card.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="primary"
                                textAlign="center"
                                sx={{ fontWeight: 600 }}
                              >
                                {card.subtitle}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#6B7280",
                                lineHeight: 1.7,
                                textAlign: "center",
                                mb: 2,
                                flex: 1,
                              }}
                            >
                              {card.description}
                            </Typography>

                            {/* Pricing Section */}
                            <Box
                              sx={{
                                mt: "auto",
                                pt: 2,
                                borderTop: "1px solid #E5E7EB",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <Typography
                                variant="h5"
                                sx={{
                                  fontWeight: 700,
                                  color: card.price === "FREE" ? "#4CAF50" : "primary.main",
                                  fontSize: card.price === "FREE" ? { xs: "1.5rem", md: "1.25rem" } : { xs: "1rem", md: "1rem" },
                                  textAlign: "center"
                                }}
                              >
                                {card.price}
                              </Typography>
                              {card.priceDetail && (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "#FF9800",
                                    fontWeight: 600,
                                    fontSize: "0.875rem",
                                    mb: { xs: 1, md: 0 },
                                  }}
                                >
                                  {card.priceDetail}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Paper>
                      </AnimatedSection>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
