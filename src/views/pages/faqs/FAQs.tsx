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
        question: "What is Trip Travel & Tours Agency and the ET Platform?",
        answer: [
          "Trip Travel & Tours Agency is a full-service online travel agency based in the Philippines, and we operate the ET (Earning While Travelling) platform. Our tagline is \"World Tourism is our Business.\"",
          "",
          "The ET platform is a comprehensive travel and lifestyle services platform that offers:",
          "• Travel bookings (flights, hotels, travel packages)",
          "• Bills Payment services",
          "• eLoad services for mobile prepaid",
          "• ET Credits for booking travel",
          "• ET Rewards program for cashback and points",
          "• Interactive map of Philippine destinations",
          "• Travel blog and destination guides",
          "• Surveys and engagement features",
        ],
      },
      {
        question: "Where is your office located?",
        answer:
          "Our office is located at Unit C And D 4th Floor Commerce And Industry Plaza Building, 1030 Campus Avenue McKinley Town Centre, McKinley Hill, Pinagsama, City of Taguig, Philippines. We welcome visitors during business hours, but we recommend contacting us first to schedule an appointment.",
      },
      {
        question: "How can I contact customer support?",
        answer: [
          "You can reach our 24/7 customer support team through multiple channels:",
          "• Phone: +632-8683-6213",
          "• Email: contact@triptravelandtours.com",
          "• Contact Form: Fill out our online contact form on our website",
          "",
          "For urgent travel matters, support is available 24/7. Standard inquiries are processed within 24 hours.",
        ],
      },
      {
        question: "How do I create an account?",
        answer: [
          "Creating an account is free and easy:",
          "1. Click 'Sign Up' or 'Register' on our website",
          "2. Enter your email address and create a password",
          "3. Fill in your basic information (name, phone number)",
          "4. Verify your email address",
          "5. Start using all ET platform services!",
          "",
          "Once registered, you can book travel, pay bills, buy eLoad, and earn rewards.",
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
          "2. Top-up Credits: Add ET Credits to your account through our secure payment channels",
          "3. Book Your Trip: Browse flights, hotels, or travel packages and use your ET Credits to book",
          "4. Enjoy Benefits: Receive your confirmation and earn ET Rewards on your booking!",
          "",
          "You can also pay directly without using ET Credits if you prefer.",
        ],
      },
      {
        question: "Can I cancel or modify my booking?",
        answer: [
          "Yes, cancellations and modifications are possible, but terms vary depending on the airline, hotel, or package provider. Please note:",
          "• Cancellation fees may apply based on the fare rules",
          "• Some promotional fares are non-refundable",
          "• Contact our support team immediately if you need to make changes",
          "• Refunds may be issued to your original payment method or as ET Credits",
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
          "• ET Credits (for travel bookings)",
          "",
          "All transactions are encrypted and PCI-DSS compliant.",
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
    category: "ET Credits & Rewards",
    items: [
      {
        question: "What are ET Credits?",
        answer: [
          "ET Credits are prepaid credits that you can use to book travel services on our platform. Think of it as your travel wallet!",
          "",
          "Benefits of using ET Credits:",
          "• Convenient one-click booking without entering payment details each time",
          "• Faster checkout process",
          "• Earn bonus rewards on credit top-ups during promotions",
          "• Easy tracking of your travel budget",
        ],
      },
      {
        question: "How do I top-up ET Credits?",
        answer: [
          "You can top-up ET Credits through multiple payment methods:",
          "1. Log in to your ET account",
          "2. Go to 'ET Credits' or 'Top-up' section",
          "3. Enter the amount you want to add",
          "4. Choose your payment method (credit card, bank transfer, e-wallet, etc.)",
          "5. Complete the payment",
          "",
          "Credits are added to your account instantly upon successful payment.",
        ],
      },
      {
        question: "What is the ET Rewards program?",
        answer: [
          "The ET Rewards program is our loyalty program that lets you earn cashback and points on eligible transactions. \"Earning While Travelling\" is our mission!",
          "",
          "You earn rewards when you:",
          "• Book flights, hotels, and travel packages",
          "• Refer friends who sign up and make bookings",
          "• Participate in surveys and promotions",
          "• Complete select bills payment and eLoad transactions (during promotions)",
        ],
      },
      {
        question: "How can I redeem my ET Rewards?",
        answer: [
          "You can redeem your ET Rewards for:",
          "• Discounts on future travel bookings",
          "• Hotel room upgrades or discounts",
          "• Bills payment credits",
          "• eLoad purchases",
          "• Exclusive member-only promotions and deals",
          "",
          "Simply log in to your ET account and apply your rewards during checkout.",
        ],
      },
      {
        question: "Do ET Credits and Rewards expire?",
        answer: [
          "ET Credits: Must be used within the validity period specified at the time of purchase. Check your account for expiration dates.",
          "",
          "ET Rewards: Remain valid as long as your account is active and you make at least one qualifying transaction within 12 months. Inactive accounts may have rewards adjusted or expired.",
          "",
          "Tip: Log in regularly and check your dashboard for expiration reminders!",
        ],
      },
      {
        question: "Is there a fee to join the ET platform?",
        answer:
          "No! Creating an ET account and joining the rewards program is completely free. There are no hidden fees, annual charges, or membership costs. Simply sign up and start enjoying all our services.",
      },
    ],
  },
  {
    category: "Bills Payment",
    items: [
      {
        question: "What is the Bills Payment service?",
        answer: [
          "Our Bills Payment service allows you to conveniently pay various bills directly through the ET platform. No need to visit payment centers or use multiple apps!",
          "",
          "Available billers include:",
          "• Electricity (Meralco, etc.)",
          "• Water utilities",
          "• Internet and cable providers",
          "• Telecommunications",
          "• Credit cards",
          "• Government payments",
          "• Insurance premiums",
          "• And many more!",
        ],
      },
      {
        question: "How do I pay a bill through the ET platform?",
        answer: [
          "Paying bills is quick and easy:",
          "1. Log in to your ET account",
          "2. Go to 'Bills Payment' section",
          "3. Select your biller from the list",
          "4. Enter your account number and payment amount",
          "5. Review the details and confirm",
          "6. Complete payment using your preferred method",
          "7. Receive instant confirmation",
          "",
          "Keep your transaction reference number for your records.",
        ],
      },
      {
        question: "Are there fees for bills payment?",
        answer:
          "A small convenience fee may apply to bills payment transactions. The exact fee is displayed before you confirm your payment, so you'll always know the total amount. Some promotional periods may offer reduced or waived fees.",
      },
      {
        question: "How long does it take for my payment to be posted?",
        answer: [
          "Payment posting times vary by biller:",
          "• Most billers: Real-time to 24 hours",
          "• Some billers: Up to 2-3 business days",
          "",
          "The estimated posting time is shown for each biller before you confirm payment. You'll receive a confirmation with your transaction reference number immediately after successful payment.",
        ],
      },
      {
        question: "Can I get a refund for bills payment?",
        answer: [
          "Bills payments that have been successfully processed and posted to the biller are generally non-refundable.",
          "",
          "However, if your payment failed (money was deducted but not received by biller), please contact our support immediately with your transaction reference number. We will investigate and process a refund within 3-5 business days if the failure is confirmed.",
          "",
          "Always double-check your account number and amount before confirming payment.",
        ],
      },
    ],
  },
  {
    category: "eLoad Services",
    items: [
      {
        question: "What is the eLoad service?",
        answer: [
          "Our eLoad service allows you to purchase prepaid mobile credits (load) for yourself or others directly through the ET platform.",
          "",
          "Supported networks include:",
          "• Globe",
          "• Smart",
          "• TNT",
          "• TM",
          "• Sun Cellular",
          "• DITO",
          "• And other Philippine networks",
        ],
      },
      {
        question: "How do I buy eLoad?",
        answer: [
          "Buying eLoad is fast and simple:",
          "1. Log in to your ET account",
          "2. Go to 'eLoad' section",
          "3. Select the network (Globe, Smart, etc.)",
          "4. Enter the recipient's mobile number",
          "5. Choose the load amount or promo",
          "6. Confirm and complete payment",
          "7. Load is sent instantly!",
          "",
          "You can buy load for your own number or send it as a gift to others.",
        ],
      },
      {
        question: "How quickly is eLoad delivered?",
        answer:
          "eLoad is typically delivered instantly (within seconds) after successful payment. In rare cases of network congestion, it may take up to a few minutes. If load is not received within 15 minutes, please contact our customer support with your transaction reference number.",
      },
      {
        question: "Can I get a refund for eLoad?",
        answer: [
          "Successfully delivered eLoad is non-refundable as it is instantly credited to the recipient's mobile number.",
          "",
          "If your payment was deducted but load was not received:",
          "• Contact our support within 24 hours",
          "• Provide your transaction reference number",
          "• We will investigate and refund within 3-5 business days if the failure is confirmed",
          "",
          "Important: Always verify the mobile number before confirming. Load sent to incorrect numbers cannot be retrieved.",
        ],
      },
      {
        question: "Are there fees for eLoad purchases?",
        answer:
          "A small service fee may apply to some eLoad transactions. The total amount (load + any fees) is always displayed before you confirm your purchase. During promotional periods, fees may be reduced or waived.",
      },
    ],
  },
  {
    category: "Interactive Features",
    items: [
      {
        question: "What is the Interactive Map feature?",
        answer: [
          "Our Interactive Map is a comprehensive guide to Philippine tourist destinations! It covers all 17 regions of the Philippines with detailed information about:",
          "",
          "• Provinces and their tourist spots",
          "• Destination descriptions and images",
          "• Location coordinates and directions",
          "• Points of interest",
          "",
          "You can explore destinations, plan your trips, and discover hidden gems across the Philippines.",
        ],
      },
      {
        question: "How do I use the Interactive Map?",
        answer: [
          "Using the map is easy:",
          "1. Go to the 'Map' or 'Explore' section",
          "2. Browse the map of the Philippines",
          "3. Click on a region to see its provinces",
          "4. Click on tourist spots to see details, images, and information",
          "5. Use the fullscreen mode for a better view",
          "",
          "You can also enable your location to see nearby attractions (GPS permission required).",
        ],
      },
      {
        question: "What are the Surveys on the platform?",
        answer: [
          "Our Surveys feature allows you to participate in polls and questionnaires about travel preferences, destinations, and platform improvements.",
          "",
          "Why participate?",
          "• Help us improve our services",
          "• Share your travel experiences and preferences",
          "• Some surveys offer ET Rewards as incentives",
          "• See what other travelers think (survey results)",
          "",
          "Participation is always voluntary, and your individual responses are kept confidential.",
        ],
      },
      {
        question: "What content is available in the Blog?",
        answer: [
          "Our Travel Blog features articles, tips, and guides including:",
          "",
          "• Destination guides and travel tips",
          "• Hidden gems and must-visit places",
          "• Travel hacks and money-saving advice",
          "• Adventure and activity recommendations",
          "• ET Rewards tips and maximizing benefits",
          "• Seasonal travel recommendations",
          "",
          "New articles are published regularly. Check back often for fresh content!",
        ],
      },
      {
        question: "Does the map use my location?",
        answer: [
          "The Interactive Map can use your location to enhance your experience, but only with your permission.",
          "",
          "• GPS location is only accessed when you actively use the map feature",
          "• You can use the map without enabling location",
          "• Location permission can be granted or revoked anytime in your device settings",
          "• We do not continuously track your location",
          "• Location data is not shared with third parties for advertising",
        ],
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
          "• Emergency evacuation and repatriation",
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
          "• Compliance with Philippine Data Privacy Act of 2012",
          "• Real-time fraud monitoring for all transactions",
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
          "• OpenStreetMap: Interactive map services",
          "• Various billers and telecom providers for Bills Payment and eLoad",
        ],
      },
      {
        question: "Are you a registered travel agency?",
        answer:
          "Yes, Trip Travel & Tours Agency is a fully registered and accredited travel agency in the Philippines. We comply with all local regulations including the Data Privacy Act of 2012 and maintain partnerships with verified airlines, hotels, and travel service providers worldwide.",
      },
      {
        question: "How do you protect my data?",
        answer: [
          "We are committed to protecting your data:",
          "• We comply with the Philippine Data Privacy Act of 2012",
          "• We have a dedicated Data Protection Officer",
          "• Your data is encrypted in transit and at rest",
          "• We never sell your personal information to third parties",
          "• You can request access, correction, or deletion of your data",
          "",
          "For privacy concerns, contact us at privacy@triptravelandtours.com",
        ],
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
            Find answers to common questions about our travel services, bills payment, eLoad, ET Credits & Rewards, interactive features, and more.
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
                          variant="h6"
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
                                variant="body1"
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
                            variant="body1"
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
            Our 24/7 customer support team is ready to help you with any questions or concerns.
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
