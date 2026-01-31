import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import { SectionHeader } from "../../landing/components/SectionHeader";
import { AnimatedSection } from "../../landing/components/AnimatedSection";

interface MembershipTier {
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceLabel: string;
  features: string[];
  bestFor: string[];
  bottomTagline: string;
  image: string;
  color: string;
  highlighted?: boolean;
}

const membershipTiers: MembershipTier[] = [
  {
    name: "Traveller",
    tagline: "Book smart. Earn automatically. Free forever.",
    description:
      "Perfect for everyday travelers who want rewards without complexity.",
    price: "FREE",
    priceLabel: "Subscription",
    features: [
      "Earn shared rewards from all travel booking activities",
      "Guaranteed cashback on flights & hotels",
      "No referrals required",
      "No fees. No commitments.",
    ],
    bestFor: ["Personal travel", "Casual bookings", "Reward-first users"],
    bottomTagline: "Simple. Free. Rewarding.",
    image: "/images/travellers.png",
    color: "#4CAF50",
  },
  {
    name: "Affiliate",
    tagline: "Turn bookings into income.",
    description:
      "Built for creators, promoters, and anyone who wants to earn by sharing travel deals.",
    price: "FREE",
    priceLabel: "Subscription",
    features: [
      "Everything in Traveller, plus:",
      "Your own unique referral & sales links",
      "Sell travel bookings like a business — set your own selling price and keep the margin",
      "Create shareable booking links you can sell online",
    ],
    bestFor: ["Content creators", "Travel promoters", "Side-hustlers"],
    bottomTagline: "Share. Earn. Grow.",
    image: "/images/affiliate.png",
    color: "#FF9800",
  },
  {
    name: "Victors",
    tagline: "Maximize earnings. Lead with advantage.",
    description:
      "Built for high-performing users who want priority access, higher profit potential, and premium treatment.",
    price: "₱99/Year",
    priceLabel: "Subscription",
    features: [
      "Higher reward rates from all travel booking activities",
      "Advanced markup controls for stronger margins",
      "Unlimited annual Victors referral subscription rewards",
      "Exclusive access to Victors-only events, terminal and mall lounge, premium gadgets and merchandises, and premium services",
    ],
    bestFor: [
      "Social media personalities with high-volume bookers",
      "Professional travel sellers",
      "Users focused on maximizing earnings",
    ],
    bottomTagline: "Serious earners. Top performers.",
    image: "/images/victors.png",
    color: "#2196F3",
    highlighted: true,
  },
];

interface RewardItem {
  activity: string;
  points: string;
}

interface TierRewards {
  name: string;
  subtitle: string;
  rewards: RewardItem[];
  color: string;
}

const rewardsData: TierRewards[] = [
  {
    name: "Traveller",
    subtitle: "Automatic rewards. No selling required.",
    color: "#4CAF50",
    rewards: [
      { activity: "Domestic flight booking cashback", points: "100 pts" },
      { activity: "Shared platform domestic flight booking", points: "25 pts" },
      {
        activity: "Shared platform international flight booking",
        points: "50 pts",
      },
      { activity: "Shared platform hotel booking", points: "25 pts" },
    ],
  },
  {
    name: "Affiliate",
    subtitle: "Earn rewards plus profit from business activity.",
    color: "#FF9800",
    rewards: [
      { activity: "Domestic flight booking cashback", points: "100 pts" },
      { activity: "Shared platform domestic flight booking", points: "25 pts" },
      {
        activity: "Shared platform international flight booking",
        points: "50 pts",
      },
      { activity: "Shared platform hotel booking", points: "25 pts" },
    ],
  },
  {
    name: "Victors",
    subtitle: "Highest rewards and earning potential across all actions.",
    color: "#2196F3",
    rewards: [
      { activity: "Annual Victors subscription", points: "10 pts" },
      { activity: "Domestic flight booking cashback", points: "100 pts" },
      { activity: "Shared platform domestic flight booking", points: "25 pts" },
      {
        activity: "Shared platform international flight booking",
        points: "50 pts",
      },
      { activity: "Shared platform hotel booking", points: "25 pts" },
    ],
  },
];

const Membership = () => {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section with Membership Cards */}
      <Box
        sx={{
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          background: "linear-gradient(135deg, #FFB800 0%, #ffa500 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
            <SectionHeader
              title={
                <>
                  <Typography variant="inherit" color="textPrimary">
                   ET Membership Levels
                  </Typography>
                </>
              }
              subtitle="Choose the membership that fits your travel style. From casual bookings to full-scale travel business, we have a plan for everyone."
              align="center"
              titleColor="white"
              subtitleColor="rgba(255,255,255,0.95)"
            />
          </AnimatedSection>

          {/* Membership Tiers Cards */}
          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {membershipTiers.map((tier, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <AnimatedSection
                  animation="fadeUp"
                  duration={0.6}
                  delay={0.1 + index * 0.1}
                >
                  <Paper
                    elevation={tier.highlighted ? 8 : 2}
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      minHeight: { xs: "auto", md: 950 },
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      position: "relative",
                      border: tier.highlighted
                        ? "none"
                        : "0px solid",
                      borderColor: tier.highlighted ? "transparent" : "divider",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    {/* Card Image */}
                    <Box
                      component="img"
                      src={tier.image}
                      alt={tier.name}
                      sx={{
                        width: "100%",
                        height: 180,
                        pt: 3,
                        objectFit: "contain",
                        transition: "transform 0.3s ease",
                      }}
                    />

                    {/* Card Content */}
                    <Box
                      sx={{
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      {/* Title & Tagline */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 0.5,
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: tier.color,
                          }}
                        >
                          {tier.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            textAlign: "center",
                            fontSize: "0.95rem",
                          }}
                        >
                          {tier.tagline}
                        </Typography>
                      </Box>

                      {/* Description */}
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.6,
                          textAlign: "center",
                          mb: 2,
                          fontSize: "0.85rem",
                        }}
                      >
                        {tier.description}
                      </Typography>

                      {/* Features */}
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            color: "text.primary",
                          }}
                        >
                          What you get
                        </Typography>
                        <List dense disablePadding>
                          {tier.features.map((feature, idx) => (
                            <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 28 }}>
                                <CheckCircleIcon
                                  sx={{ fontSize: 16, color: tier.color }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={feature}
                                slotProps={{
                                  primary: {
                                    sx: {
                                      fontSize: "0.95rem",
                                      color: "text.secondary",
                                      lineHeight: 1.5,
                                    },
                                  },
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>

                      {/* Best For */}
                      <Box sx={{ mb: 2, flexGrow: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            color: "text.primary",
                          }}
                        >
                          Best for
                        </Typography>
                        <List dense disablePadding>
                          {tier.bestFor.map((item, idx) => (
                            <ListItem key={idx} disableGutters sx={{ py: 0.25 }}>
                              <ListItemText
                                primary={`• ${item}`}
                                slotProps={{
                                  primary: {
                                    sx: {
                                      fontSize: "0.95rem",
                                      color: "text.secondary",
                                    },
                                  },
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>

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
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: tier.price === "FREE" ? "#4CAF50" : "primary.main",
                            textAlign: "center",
                          }}
                        >
                          {tier.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#FF9800",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                          }}
                        >
                          {tier.priceLabel}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </AnimatedSection>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Rewards Points Section */}
      <Box sx={{ bgcolor: "grey.50", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
            <SectionHeader
              badge="REWARDS"
              badgeColor="#1b60ff"
              title="ET Rewards Points Program"
              subtitle="Earn points on every booking and activity. Rewards points have a redemption value of ₱1 per point, subject to platform rules."
              align="center"
            />
          </AnimatedSection>

          <Grid container spacing={4}>
            {rewardsData.map((tier, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <AnimatedSection
                  animation="fadeUp"
                  duration={0.6}
                  delay={0.1 + index * 0.1}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      minHeight: { xs: 'auto', md: 600 },
                      borderRadius: 3,
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: 3,
                        borderColor: tier.color,
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: tier.color,
                      }}
                    >
                      {tier.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        mb: 3,
                      }}
                    >
                      {tier.subtitle}
                    </Typography>

                    <List dense disablePadding>
                      {tier.rewards.map((reward, idx) => (
                        <ListItem
                          key={idx}
                          disableGutters
                          sx={{
                            py: 1.5,
                            borderBottom:
                              idx < tier.rewards.length - 1
                                ? "1px solid"
                                : "none",
                            borderColor: "divider",
                          }}
                        >
                          <ListItemText
                            primary={reward.activity}
                            secondary={
                              <Chip
                                label={reward.points}
                                size="small"
                                sx={{
                                  mt: 1,
                                  fontWeight: 600,
                                  bgcolor: `${tier.color}15`,
                                  color: tier.color,
                                }}
                              />
                            }
                            slotProps={{
                              primary: {
                                sx: {
                                  fontWeight: 500,
                                  fontSize: "0.95rem",
                                },
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </AnimatedSection>
              </Grid>
            ))}
          </Grid>

          {/* Note */}
          <AnimatedSection animation="fadeUp" duration={0.6} delay={0.4}>
            <Paper
              sx={{
                mt: 6,
                p: 3,
                bgcolor: "primary.main",
                color: "white",
                textAlign: "center",
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Rewards points have a redemption value of 1 PHP per point, subject
                to platform rules.
              </Typography>
            </Paper>
          </AnimatedSection>
        </Container>
      </Box>

      {/* CTA Section */}
      {/* <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <AnimatedSection animation="fadeUp" duration={0.8} delay={0}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 3,
                textAlign: "center",
                background: "linear-gradient(135deg, #3b82f6, #1e40af)",
                color: "white",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Ready to Start Earning?
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: "auto" }}
              >
                Join thousands of travelers who are already earning rewards on
                their bookings. Sign up today and choose your membership level.
              </Typography>
              <Button
                variant="contained"
                size="large"
                href="https://etapp.triptravelandtours.com"
                sx={{
                  bgcolor: "white",
                  color: "#1e40af",
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                Sign Up Now
              </Button>
            </Paper>
          </AnimatedSection>
        </Container>
      </Box> */}
    </Box>
  );
};

export default Membership;
