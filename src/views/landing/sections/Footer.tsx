import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { SvgIcon } from "@mui/material";

// TikTok Icon Component
const TikTokIcon = (props: React.ComponentProps<typeof SvgIcon>) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </SvgIcon>
);

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#blog" },
  ],
  quickLinks: [
    { label: "What We Offer", href: "#what-we-offer" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Explore", href: "/map" },
    { label: "Partnerships", href: "#partners" },
  ],
  support: [
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/#contact" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
};

const socialLinks = [
  { icon: FacebookIcon, href: "https://www.facebook.com/profile.php?id=61555167518114", label: "Facebook" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@earningwhiletravellingph?is_from_webapp=1&sender_device=pc", label: "TikTok" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: YouTubeIcon, href: "https://www.youtube.com/@earningwhiletravelling2026", label: "YouTube" },
];

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background:
          "linear-gradient(135deg, rgba(31, 41, 55, 0) 0%, rgba(31, 41, 55, 0.5) 100%), url(/images/silhouette3.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
        color: "white",
        pt: 10,
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            mb: 6,
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: { md: "2fr 1fr 1fr 1fr" },
          }}
        >
          {/* Company Info */}
          <Grid size={{ xs: 12, md: "auto" }}>
            <Box
              component="a"
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Box
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
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: ".95rem", sm: ".95rem" },
                  letterSpacing: 0,
                }}
              >
                Trip Travel & Tours Agency
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.7)",
                mb: 2,
                lineHeight: 1.7,
              }}
            >
              Your ultimate platform for booking travel and earning money.
              Explore the world while building your income through commissions,
              referrals, and rewards.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <IconButton
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      bgcolor: "rgba(255,255,255,0.1)",
                      "&:hover": {
                        color: "primary.main",
                        bgcolor: "secondary.main",
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                );
              })}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, md: "auto" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "white",
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#FFD23F",
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: "auto" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "white",
              }}
            >
              Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {footerLinks.support.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#FFD23F",
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: "auto" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: "white",
              }}
            >
              Contact Info
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Address */}
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <LocationOnIcon
                  sx={{ color: "#FFD23F", fontSize: 20, mt: 0.3 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.6,
                    fontSize: "0.875rem",
                  }}
                >
                  Unit C And D 4th Floor Commerce And Industry Plaza Building
                  1030 Campus Avenue Mckinley Town Centre Mckinley Hill,
                  Pinagsama, City Of Taguig, Philippines
                </Typography>
              </Box>

              {/* Phone */}
              <Box component="a" href="tel:+63286836213" sx={{ display: "flex", gap: 1.5, alignItems: "center", textDecoration: "none" }}>
                <PhoneIcon sx={{ color: "#FFD23F", fontSize: 20 }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.875rem",
                  }}
                >
                  +632-8683-6213
                </Typography>
              </Box>

              {/* Email */}
              <Box component="a" href="mailto:contact@earningwhiletravelling.com" sx={{ display: "flex", gap: 1.5, alignItems: "center", textDecoration: "none" }}>
                <EmailIcon sx={{ color: "#FFD23F", fontSize: 20 }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.875rem",
                  }}
                >
                  contact@triptravelandtours.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            pt: 4,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} Trip Travel & Tours Agency. All rights
            reserved.
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.5)" }}>
            Powered by{" "}
            <Box
              component="a"
              href="https://triptravelandtours.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#00b8ff",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              RAG IT SOLUTIONS
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
