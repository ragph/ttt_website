import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const faqCategories = [
  {
    category: "General Questions",
    items: [
      {
        question: "What is Trip Travel & Tours Agency?",
        answer:
          "Trip Travel & Tours Agency is a full-service online travel agency based in the Philippines. We specialize in booking flights, hotels, travel packages, and providing visa and insurance assistance. We're also the creators of the Earning While Travelling (ET) rewards platform, which allows customers to earn cashback and redeemable points on every eligible booking.",
      },
      {
        question: "Where is your office located?",
        answer:
          "Our office is located at Unit C And D 4th Floor Commerce And Industry Plaza Building, 1030 Campus Avenue McKinley Town Centre, McKinley Hill, Pinagsama, City of Taguig, Philippines. We welcome visitors during business hours, but we recommend contacting us first to schedule an appointment.",
      },
      {
        question: "How can I contact customer support?",
        answer: [
          "You can reach our customer support team through multiple channels:",
          "• Phone: +632-8683-6213",
          "• Email: contact@triptravelandtours.com",
          "• Contact Form: Fill out our online contact form on our website",
          "",
          "We aim to respond to all inquiries within 24 hours.",
        ],
      },
    ],
  },
  {
    category: "Booking & Reservations",
    items: [
      {
        question: "How do I book a flight or hotel?",
        answer: [
          "Booking is simple and can be done in 4 steps:",
          "1. Sign Up: Create your free account on our ET platform",
          "2. Book Your Trip: Browse flights, hotels, or travel packages on earningwhiletravelling.com",
          "3. Complete Payment: Use our secure payment gateway to finalize your booking",
          "4. Receive Confirmation: Get your booking confirmation via email instantly",
        ],
      },
      {
        question: "Can I cancel or modify my booking?",
        answer: [
          "Yes, cancellations and modifications are possible, but terms vary depending on the airline, hotel, or package provider. Please note:",
          "• Cancellation fees may apply based on the fare rules",
          "• Some promotional fares are non-refundable",
          "• Contact our support team immediately if you need to make changes",
          "• We recommend purchasing travel insurance for added protection",
        ],
      },
      {
        question: "What payment methods do you accept?",
        answer: [
          "We accept multiple secure payment methods through our trusted partners (Xendit, UnionBank, Wise):",
          "• Credit/Debit Cards (Visa, Mastercard, JCB, American Express)",
          "• Online Banking / Bank Transfer",
          "• E-Wallets (GCash, PayMaya, etc.)",
          "• Over-the-counter payment options",
          "",
          "All transactions are encrypted and secured.",
        ],
      },
      {
        question: "How will I receive my booking confirmation?",
        answer: [
          "Once your payment is confirmed, you'll receive:",
          "• An email confirmation with your booking reference number",
          "• E-tickets for flights (if applicable)",
          "• Hotel vouchers (if applicable)",
          "• Complete itinerary details",
          "",
          "Please check your spam folder if you don't receive it within 30 minutes. You can also access your bookings through your ET account dashboard.",
        ],
      },
    ],
  },
  {
    category: "Earning While Travelling (ET) Rewards",
    items: [
      {
        question: "What is the Earning While Travelling (ET) platform?",
        answer: [
          "The ET platform is our proprietary rewards program created by Trip Travel & Tours Agency. It allows you to earn cashback and redeemable points every time you book eligible travel services through us. The more you travel, the more you earn!",
          "",
          "Our platform is designed to reward loyal customers and make travel more affordable through accumulated benefits.",
        ],
      },
      {
        question: "How do I earn rewards?",
        answer: [
          "You earn rewards automatically when you:",
          "• Book Flights: Earn points and cashback on eligible flight bookings",
          "• Book Hotels: Get rewards on hotel reservations",
          "• Purchase Packages: Earn on complete travel packages",
          "• Refer Friends: Get bonus rewards when friends sign up and book",
          "",
          "Rewards are credited to your ET wallet after your trip is completed.",
        ],
      },
      {
        question: "How can I redeem my ET rewards?",
        answer: [
          "You can redeem your ET rewards for:",
          "• Discounts on future flight bookings",
          "• Hotel room upgrades or discounts",
          "• Travel package deals and perks",
          "• Exclusive member-only promotions",
          "",
          "Simply log in to your ET account and apply your rewards during checkout.",
        ],
      },
      {
        question: "Do ET rewards expire?",
        answer:
          "ET points and cashback remain valid as long as your account is active and you make at least one booking within a 12-month period. Inactive accounts may have their rewards adjusted or expired. Check your ET dashboard for specific expiration dates on your rewards.",
      },
      {
        question: "Is there a fee to join the ET rewards program?",
        answer:
          "No! Joining the ET rewards program is completely free. Simply create an account and start earning rewards on your very first booking. There are no hidden fees, annual charges, or membership costs.",
      },
    ],
  },
  {
    category: "Travel Services & Support",
    items: [
      {
        question: "Do you provide visa assistance?",
        answer: [
          "Yes! We offer comprehensive visa assistance services including:",
          "• Visa application guidance and documentation support",
          "• Appointment scheduling assistance",
          "• Document review and preparation",
          "• Updates on application status",
          "",
          "Contact our team for specific visa requirements for your destination country.",
        ],
      },
      {
        question: "Do you offer travel insurance?",
        answer: [
          "Yes, we partner with reliable insurance providers to offer comprehensive travel insurance that covers:",
          "• Trip cancellation and interruption",
          "• Medical emergencies abroad",
          "• Lost or delayed baggage",
          "• Flight delays and missed connections",
          "• Emergency evacuation",
          "",
          "We highly recommend purchasing travel insurance for peace of mind during your trips.",
        ],
      },
      {
        question: "Can you help with group bookings?",
        answer: [
          "Absolutely! We specialize in group travel for:",
          "• Corporate Events: Business meetings, conferences, team building",
          "• Educational Tours: School trips and educational excursions",
          "• Family Reunions: Multi-family vacation packages",
          "• Special Events: Weddings, anniversaries, celebrations",
          "",
          "Contact us for special group rates and customized packages.",
        ],
      },
      {
        question: "What types of travel packages do you offer?",
        answer: [
          "We offer diverse travel packages tailored to different travel styles:",
          "• Leisure Tourism: Beach resorts, relaxation, sightseeing tours",
          "• Business Tourism (MICE): Corporate meetings, conferences, exhibitions",
          "• Medical Tourism: Healthcare travel and wellness retreats",
          "• Sports Tourism: Sporting events and adventure activities",
          "• Cultural Tourism: Heritage sites and cultural experiences",
        ],
      },
    ],
  },
  {
    category: "Security & Trust",
    items: [
      {
        question: "Is my personal and payment information secure?",
        answer: [
          "Absolutely. We take security seriously and implement multiple layers of protection:",
          "• SSL encryption for all data transmissions",
          "• PCI-DSS compliant payment processing through Xendit and UnionBank",
          "• Secure data storage with regular security audits",
          "• We never store complete credit card information",
          "• Two-factor authentication available for account protection",
        ],
      },
      {
        question: "Who are your partners?",
        answer: [
          "We work with trusted industry leaders to provide the best service:",
          "• Amadeus: Global distribution system for flights and hotels",
          "• Travelport: Travel commerce platform",
          "• UnionBank: Secure payment processing",
          "• Xendit: Payment gateway solutions",
          "• Wise: International money transfers",
          "• QAsia: Regional travel services",
        ],
      },
      {
        question: "Are you a registered travel agency?",
        answer:
          "Yes, Trip Travel & Tours Agency is a fully registered and accredited travel agency in the Philippines. We comply with all local regulations and maintain partnerships with verified airlines, hotels, and travel service providers worldwide.",
      },
    ],
  },
];

const FAQs = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box>
      {/* Hero Banner */}
      <Box
        sx={{
          bgcolor: "#1e40af",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 0,
              opacity: 0.95,
              maxWidth: 900,
              mx: "auto",
              lineHeight: 1.6,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Find answers to common questions about our travel services, booking process, and the Earning While Travelling (ET) rewards platform.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {faqCategories.map((category, categoryIndex) => (
            <Paper
              key={categoryIndex}
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {category.category}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {category.items.map((faq, faqIndex) => {
                  const panelId = `panel-${categoryIndex}-${faqIndex}`;
                  return (
                    <Accordion
                      key={faqIndex}
                      expanded={expanded === panelId}
                      onChange={handleChange(panelId)}
                      sx={{
                        boxShadow: "none",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "8px !important",
                        "&:before": {
                          display: "none",
                        },
                        "&.Mui-expanded": {
                          margin: "0 !important",
                          mb: 1,
                        },
                        mb: 1,
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          "& .MuiAccordionSummary-content": {
                            my: 1.5,
                          },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                          }}
                        >
                          {faq.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {Array.isArray(faq.answer) ? (
                          <Box>
                            {faq.answer.map((line, lineIndex) => (
                              <Typography
                                key={lineIndex}
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  lineHeight: 1.8,
                                  mb: line === "" ? 1 : 0.5,
                                  whiteSpace: "pre-line",
                                }}
                              >
                                {line}
                              </Typography>
                            ))}
                          </Box>
                        ) : (
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              lineHeight: 1.8,
                            }}
                          >
                            {faq.answer}
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Contact Support Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 6,
            borderRadius: 2,
            textAlign: "center",
            bgcolor: "primary.main",
            color: "white",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Still Have Questions?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Our customer support team is ready to help you with any questions or concerns.
          </Typography>
          <Button
            variant="contained"
            href="#contact"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.9)",
              },
            }}
          >
            Contact Us
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default FAQs;
