import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

interface Section {
  title: string;
  content: string[];
}

const sections: Section[] = [
  {
    title: "1. Scope and Purpose",
    content: [
      "Trip Travel and Tours Agency operates the ET (Earning While Travelling) platform, a comprehensive online travel and lifestyle services platform in the Philippines. Our services include travel bookings (flights, hotels, travel packages), Bills Payment services, eLoad services, and the ET Credits and Rewards system.",
      "This Refund Policy explains the conditions under which refunds, cancellations, and changes may be requested and processed for each type of service offered on our platform.",
    ],
  },
  {
    title: "2. Role of Trip Travel and Tours Agency",
    content: [
      "Trip Travel and Tours Agency acts as an intermediary between customers and various service providers including airlines, hotels, tour operators, billers, and telecommunications companies.",
      "For Travel Services: Trip Travel and Tours Agency is not the issuer of airline tickets. Tickets and booking confirmations are issued directly by airlines or their authorized providers through our partners Amadeus and Travelport. Final decisions regarding refunds and cancellations are determined by the airline or accommodation provider.",
      "For Bills Payment and eLoad Services: We act as a payment facilitator. Once transactions are successfully processed and confirmed by the receiving party (biller or telecom provider), they are generally non-refundable.",
    ],
  },
  {
    title: "3. Third-Party Booking and Ticket Issuance",
    content: [
      "Travel bookings are processed through authorized third-party reservation systems (Amadeus, Travelport) used by airlines and accommodation providers.",
      "Accordingly: Refunds, cancellations, and booking changes are subject to the supplier's fare rules, policies, and approval. Processing timelines are determined by the airline, hotel, or tour operator. Trip Travel and Tours Agency does not control ticket issuance, refund authorization, or approval timelines.",
      "Trip Travel and Tours Agency will assist customers in submitting refund requests but does not guarantee approval, timing, or outcome.",
    ],
  },
  {
    title: "4. Airline Ticket Refunds",
    content: [
      "Refundable Tickets: Refunds are allowed only if permitted by the airline's fare rules. Airline penalties and administrative fees may apply. Refundable amounts are subject to airline confirmation. Refunds may be issued to the original payment method or as ET Credits (subject to availability and customer preference).",
      "Non-Refundable Tickets: Promotional and discounted fares are non-refundable. No refunds are provided for no-shows. Some taxes may be refundable only if allowed by the airline.",
      "Airline-Initiated Changes: If a flight is cancelled or significantly changed by the airline, refund or rebooking eligibility will follow airline policy. We will notify affected customers and assist with available options.",
    ],
  },
  {
    title: "5. Hotel Booking Refunds",
    content: [
      "Refundable Bookings: Refunds are allowed only if cancellation is made within the stated free cancellation period as specified at the time of booking. Full refund will be processed minus any applicable service fees.",
      "Non-Refundable Bookings: Prepaid, discounted, or promotional hotel bookings are non-refundable. No refunds for early check-out or no-shows. Some properties may offer rebooking options at their discretion.",
      "Hotel-Initiated Changes: If a hotel cancels or significantly modifies your reservation, we will assist you in obtaining a refund or finding alternative accommodation.",
    ],
  },
  {
    title: "6. Travel Package Refunds",
    content: [
      "Travel packages (including tours covering Leisure, Business/MICE, Medical, and Sports Tourism) have specific cancellation and refund terms that vary by package and supplier.",
      "General Guidelines: Cancellation charges increase as the departure date approaches. Full refunds are typically not available for cancellations made within 30 days of departure. Some package components (flights, hotels, tours) may have different refund eligibility. Group bookings may have separate cancellation terms.",
      "Package-Specific Terms: Specific refund terms for each travel package will be provided at the time of booking. Please review these terms carefully before confirming your purchase.",
      "Partial Cancellations: If you wish to cancel only part of a travel package, refund eligibility will depend on the supplier's policies and may affect the pricing of remaining components.",
    ],
  },
  {
    title: "7. Bills Payment Refunds",
    content: [
      "Successfully Processed Payments: Bills payments that have been successfully processed and posted to the biller are NON-REFUNDABLE. Once a payment is confirmed by the biller, it cannot be reversed through our platform.",
      "Failed Transactions: If your payment was deducted but the transaction failed to process (payment not received by biller), please contact our customer support immediately with your transaction reference number. We will investigate and process a refund within 3-5 business days if the failure is confirmed.",
      "Incorrect Payment Information: Payments made with incorrect account numbers, amounts, or biller selection due to user error are non-refundable. Please verify all details before confirming payment.",
      "Duplicate Payments: If you accidentally made a duplicate payment, contact our customer support with both transaction reference numbers. We will coordinate with the biller for resolution, which may take 7-14 business days.",
      "Convenience Fees: Convenience fees charged for bills payment transactions are non-refundable, even if the underlying payment is refunded.",
    ],
  },
  {
    title: "8. eLoad Refunds",
    content: [
      "Successfully Processed eLoad: eLoad transactions that have been successfully sent to the recipient's mobile number are NON-REFUNDABLE. Once the load has been credited to the mobile number, it cannot be reversed.",
      "Failed Transactions: If your payment was deducted but the eLoad was not received by the recipient, please contact our customer support within 24 hours with your transaction reference number and the recipient's mobile number. We will investigate and process a refund within 3-5 business days if the failure is confirmed.",
      "Incorrect Mobile Number: eLoad sent to an incorrect mobile number due to user error is NON-REFUNDABLE. Please double-check the mobile number before confirming the transaction.",
      "Network Issues: Delays in load delivery due to telecommunications network issues are not grounds for refund. Load will typically be credited once the network issue is resolved.",
      "Service Fees: Service fees charged for eLoad transactions are non-refundable.",
    ],
  },
  {
    title: "9. ET Credits Refunds",
    content: [
      "Purchased ET Credits: ET Credits purchased through our platform may be refundable subject to the following conditions: Credits must be unused and not expired. A processing fee of up to 10% may be deducted. Refund requests must be submitted through our official channels. Refunds will be processed to the original payment method within 14-30 business days.",
      "Promotional and Bonus Credits: ET Credits received as bonuses, promotional offers, referral rewards, or through the ET Rewards Program are NON-REFUNDABLE and cannot be converted to cash.",
      "Expired Credits: Expired ET Credits are non-refundable. Please use your credits before the expiration date shown in your account.",
      "Account Termination: If your account is terminated due to violation of our Terms of Service, all ET Credits (purchased and promotional) will be forfeited and are non-refundable.",
    ],
  },
  {
    title: "10. ET Rewards Program",
    content: [
      "Earned Rewards: Cashback and points earned through the ET Rewards Program are non-refundable and cannot be converted to cash. Rewards can only be redeemed for eligible services as specified in the program terms.",
      "Cancelled Bookings: If a booking that earned rewards is subsequently cancelled and refunded, the associated rewards will be deducted from your account. If rewards have already been used, the value may be deducted from any refund amount.",
      "Survey Incentives: Rewards or incentives earned through survey participation are subject to verification. Fraudulent responses may result in forfeiture of rewards.",
    ],
  },
  {
    title: "11. Service and Payment Fees",
    content: [
      "Service fees and booking charges collected by Trip Travel and Tours Agency are generally non-refundable, unless required by law or at our discretion in exceptional circumstances.",
      "Supplier penalties will be deducted from any approved refund.",
      "Payment processing fees charged by our payment partners (Xendit, UnionBank, Wise) may not be refundable depending on the payment method used.",
    ],
  },
  {
    title: "12. Refund Processing Time",
    content: [
      "Refunds are processed only after verification and/or supplier approval where applicable.",
      "Estimated processing times by service type: Airline tickets (30-90 business days, subject to airline processing), Hotel bookings (15-45 business days), Travel packages (30-60 business days), Bills Payment failed transactions (3-5 business days), eLoad failed transactions (3-5 business days), ET Credits (14-30 business days).",
      "Refunds are credited back to the original payment method unless otherwise agreed. Credit card refunds may take additional time to reflect in your statement depending on your bank.",
      "You may opt to receive eligible refunds as ET Credits for faster processing (typically 3-5 business days).",
    ],
  },
  {
    title: "13. How to Request a Refund",
    content: [
      "To request a refund, please follow these steps: Log in to your ET account and navigate to your transaction history. Select the transaction you wish to request a refund for. Click on 'Request Refund' and provide the required information. Submit your request and note your refund request reference number.",
      "Alternatively, you may contact our customer support: Email: contact@triptravelandtours.com, Phone: +632-8683-6213. Please have your booking reference number or transaction ID ready.",
      "Required information for refund requests: Full name as registered on your account, Transaction or booking reference number, Date of transaction, Reason for refund request, and Supporting documents (if applicable).",
    ],
  },
  {
    title: "14. Force Majeure",
    content: [
      "Refunds due to events beyond reasonable control (including but not limited to natural disasters, pandemics, government restrictions, civil unrest, or airline/service disruptions) are subject to supplier policies.",
      "In force majeure situations, we will work with our partners to provide the best possible resolution, which may include rebooking options, travel credits, or refunds as permitted by the service providers.",
      "Trip Travel and Tours Agency is not liable for additional costs incurred due to force majeure events.",
    ],
  },
  {
    title: "15. Customer Responsibility",
    content: [
      "Customers are responsible for: Reviewing all booking and transaction details before confirmation, Providing accurate information for all transactions, Understanding the refund terms applicable to their specific booking or transaction, Keeping transaction reference numbers and receipts for future reference, and Submitting refund requests within the applicable timeframes.",
      "Errors in names, dates, destinations, account numbers, mobile numbers, or other details due to customer input may result in non-refundable transactions.",
    ],
  },
  {
    title: "16. Policy Changes",
    content: [
      "Trip Travel and Tours Agency reserves the right to update this Refund Policy at any time. Updates take effect once published on our website.",
      "We recommend reviewing this policy periodically. Material changes will be communicated through: Email notification to registered users, Prominent notice on our website, In-app notifications, and Updates to the 'Last Updated' date on this page.",
    ],
  },
  {
    title: "17. Contact Information",
    content: [
      "If you have any questions about this Refund Policy or need assistance with a refund request, please contact us:",
      "Trip Travel & Tours Agency (ET Platform)",
      "Address: Unit C And D 4th Floor Commerce And Industry Plaza Building, 1030 Campus Avenue McKinley Town Centre, McKinley Hill, Pinagsama, City of Taguig, Philippines",
      "Phone: +632-8683-6213",
      "Email: contact@triptravelandtours.com",
      "Website: www.triptravelandtours.com",
      "Customer Support Hours: 24/7 for urgent travel matters; Standard inquiries processed within 24-48 hours.",
    ],
  },
];

const RefundPolicy = () => {
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
            Refund Policy
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              opacity: 0.95,
              maxWidth: 800,
              mx: "auto",
              lineHeight: 1.6,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Understand our refund and cancellation policies for travel bookings, bills payment, eLoad, and ET Credits.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              fontWeight: 500,
            }}
          >
            Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          {/* Sections */}
          {sections.map((section, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "text.primary",
                }}
              >
                {section.title}
              </Typography>
              {section.content.map((paragraph, pIndex) => (
                <Typography
                  key={pIndex}
                  variant="body1"
                  sx={{
                    mb: 2,
                    lineHeight: 1.8,
                    color: "text.secondary",
                    textAlign: "justify",
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
              {index < sections.length - 1 && <Divider sx={{ mt: 3 }} />}
            </Box>
          ))}

          {/* Agreement Statement */}
          <Box
            sx={{
              mt: 5,
              p: 3,
              bgcolor: "warning.lighter",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "primary.dark",
              }}
            >
              Agreement
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8, color: "text.secondary" }}>
              By using our services and making transactions through the Trip Travel and Tours Agency ET (Earning While Travelling) platform, including travel bookings, bills payment, eLoad services, and ET Credits, you acknowledge that you have read, understood, and agree to be bound by this Refund Policy.
            </Typography>
          </Box>
        </Paper>

        {/* Contact Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 4,
            borderRadius: 2,
            textAlign: "center",
            bgcolor: "primary.main",
            color: "white",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Need Help with a Refund?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
            Our 24/7 customer support team is here to assist you with refund requests
          </Typography>
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <EmailIcon sx={{ fontSize: 20 }} />
              <Typography variant="body1">
                contact@triptravelandtours.com
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <PhoneIcon sx={{ fontSize: 20 }} />
              <Typography variant="body1">
                +632-8683-6213
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RefundPolicy;
