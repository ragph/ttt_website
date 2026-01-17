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
    title: "1. Introduction",
    content: [
      "Trip Travel & Tours Agency and the ET (Earning While Travelling) platform (\"we,\" \"us,\" or \"our\") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, or services.",
      "Our platform provides multiple services including travel bookings (flights, hotels, travel packages), Bills Payment services, eLoad services, the ET Credits and Rewards system, interactive features (Philippine destinations map, surveys, blog), and customer support services.",
      "By using our services, you consent to the data practices described in this policy. If you do not agree with this Privacy Policy, please do not use our services. This policy complies with the Philippine Data Privacy Act of 2012 (Republic Act No. 10173) and its implementing rules and regulations.",
    ],
  },
  {
    title: "2. Information We Collect",
    content: [
      "Personal Information You Provide: Account Information (Full name, email address, phone number, password, date of birth, gender), Profile Information (Profile picture, preferences, travel interests, notification settings), Identity Documents (Passport details, government ID information for travel bookings and verification), and Contact Information (Address, emergency contact details).",
      "Travel Booking Information: Passenger details for all travelers, Travel dates and destination preferences, Special requests (meal preferences, accessibility needs, room preferences), Frequent flyer or hotel loyalty program numbers, and Travel insurance preferences.",
      "Financial and Transaction Information: Payment card details (processed securely through our partners Xendit, UnionBank, Wise), Billing address, ET Credits balance and transaction history, ET Rewards points and redemption history, and Bills payment and eLoad transaction records.",
      "Bills Payment Information: Biller account numbers, Payment amounts and dates, Biller names and categories, and Transaction reference numbers.",
      "eLoad Information: Recipient mobile numbers, Network provider, Load amounts and denominations, and Transaction timestamps.",
      "Automatically Collected Information: Device Information (IP address, browser type and version, operating system, device identifiers, screen resolution), Usage Data (Pages viewed, features used, time spent on platform, click patterns, search queries), Location Information (General location from IP address, precise GPS location when using our interactive map feature - with your consent), and Cookies and Tracking Technologies (Session data, preferences, authentication tokens).",
      "Information from Third Parties: Travel service providers (Amadeus, Travelport - booking confirmations, itinerary changes), Payment processors (Transaction verification, fraud prevention data), Billers and telecommunications providers (Payment confirmation status), Social media platforms (If you link accounts or use social login), and Publicly available information for fraud prevention.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: [
      "Travel Services: Process and manage flight, hotel, and travel package bookings, Send booking confirmations, e-tickets, and travel documents, Provide booking modifications and cancellation services, Coordinate with airlines, hotels, and tour operators, and Manage group bookings and special requests.",
      "Bills Payment and eLoad Services: Process bill payments to your selected billers, Execute mobile load purchases to recipient numbers, Maintain transaction history for your records, Generate receipts and confirmation notifications, and Investigate and resolve failed transactions.",
      "ET Credits and Rewards: Manage your ET Credits balance and top-ups, Track and credit ET Rewards points and cashback, Process rewards redemption for eligible services, Send notifications about expiring credits or rewards, and Administer referral program benefits.",
      "Interactive Platform Features: Display relevant tourist destinations on our interactive map, Provide personalized destination recommendations based on your interests, Enable participation in surveys and polls, Deliver blog content and travel guides, and Analyze platform usage to improve features.",
      "Communication: Send service-related notifications (booking updates, payment confirmations, transaction alerts), Provide customer support responses, Deliver marketing communications about offers and promotions (with your consent), Send surveys and feedback requests, and Notify you of policy changes and important updates.",
      "Security and Compliance: Verify your identity for account security, Prevent fraud, unauthorized transactions, and abuse, Comply with Philippine laws and regulations (Data Privacy Act, Anti-Money Laundering Act), Enforce our Terms of Service, and Respond to legal requests and protect our rights.",
      "Analytics and Improvement: Analyze usage patterns to improve services, Conduct research on travel trends and user preferences, Test new features and optimize platform performance, Generate aggregated, anonymized insights, and Improve our interactive map and destination information.",
    ],
  },
  {
    title: "4. Survey and User Feedback Data",
    content: [
      "When you participate in surveys on our platform, we collect: Your survey responses and selections, Time spent on surveys, Completion status, and Optional demographic information you choose to provide.",
      "How We Use Survey Data: Improve our services and platform features, Understand user preferences and travel trends, Develop new products and offerings, Generate aggregated insights (individual responses are not shared), and Award survey participation incentives to your account.",
      "Survey Data Protection: Individual survey responses are kept confidential, Results are aggregated for analysis - we do not publish individual responses, Participation is voluntary and you can skip any question, Survey data is not sold to third parties, and You may request deletion of your survey responses.",
    ],
  },
  {
    title: "5. Location Data and Interactive Map",
    content: [
      "Our interactive map of Philippine destinations uses location data to enhance your experience. Types of Location Data: IP-based location (Automatically collected for general region detection), GPS location (Collected only with your explicit consent when using map features).",
      "How We Use Location Data: Show your current location on the interactive map, Provide distance calculations to tourist destinations, Suggest nearby attractions and points of interest, Improve destination recommendations, and Analyze regional usage patterns (aggregated data only).",
      "Your Location Choices: You can use the map without enabling GPS location, GPS location permission can be granted or revoked at any time through your device settings, We do not continuously track your location - it is only accessed when you actively use map features, and Location data is not shared with third parties for advertising purposes.",
    ],
  },
  {
    title: "6. How We Share Your Information",
    content: [
      "We do not sell your personal information to third parties. We may share your information with:",
      "Travel Service Providers: Airlines, hotels, and tour operators (to fulfill your bookings), Travel insurance providers (when you purchase insurance), Visa processing services (for visa assistance), and Ground transportation providers.",
      "Payment and Financial Partners: Xendit, UnionBank, Wise (for payment processing), Billers (account number and payment amount only for bills payment), Telecommunications providers (mobile number only for eLoad), and Fraud prevention services.",
      "Technology and Service Partners: Cloud hosting providers (Amazon Web Services, Google Cloud), Analytics services (aggregated, anonymized data), Customer support platforms, Email and notification services, and Map services (OpenStreetMap).",
      "Business and Legal: Business transfers (merger, acquisition, or sale of assets - with user notification), Legal requirements (court orders, government requests, regulatory compliance), Fraud prevention (to protect against unauthorized transactions), and Rights protection (to enforce our terms and protect users).",
      "With Your Consent: We may share information with other parties when you explicitly authorize us to do so.",
    ],
  },
  {
    title: "7. Data Security",
    content: [
      "Technical Safeguards: SSL/TLS encryption for all data transmission, Encrypted databases and secure server infrastructure, Multi-factor authentication options, PCI-DSS compliance for payment processing, Regular security audits and penetration testing, and Secure API connections with partners.",
      "Organizational Safeguards: Employee data protection training, Confidentiality agreements with all staff and partners, Role-based access controls (need-to-know basis), Incident response procedures, Regular policy reviews and updates, and Data processing agreements with third parties.",
      "Bills Payment and eLoad Security: Real-time transaction encryption, Secure connections with billers and telecom providers, Transaction verification and confirmation systems, and Fraud monitoring and detection.",
      "While we implement robust security measures, no method of transmission over the internet is 100% secure. We continuously work to maintain and improve our security practices.",
    ],
  },
  {
    title: "8. Cookies and Tracking Technologies",
    content: [
      "Cookies are small text files stored on your device when you visit our website. We use cookies and similar technologies to enhance your experience.",
      "Types of Cookies We Use: Essential Cookies (Required for platform functionality - authentication, security, session management), Performance Cookies (Analytics to understand how visitors use our platform), Functional Cookies (Remember your preferences, language, and settings), and Marketing Cookies (Track browsing for relevant advertisements - with your consent).",
      "Specific Uses: Remember your login status, Store your theme preference (dark/light mode), Maintain items in your booking cart, Track pages visited for analytics, and Enable social media features.",
      "Managing Cookies: Browser settings (block or delete cookies), Cookie consent banner (manage preferences), Third-party opt-out tools, and Account settings for marketing preferences. Note: Disabling essential cookies may prevent you from using certain features.",
    ],
  },
  {
    title: "9. Your Privacy Rights",
    content: [
      "Under the Philippine Data Privacy Act of 2012, you have the following rights:",
      "Right to Access: Request a copy of your personal information we hold, Know what data we have collected about you, Understand how your data is being used, and Receive your data in a structured, machine-readable format.",
      "Right to Correction: Update your account information at any time, Request correction of inaccurate or incomplete data, and Modify your communication and privacy preferences.",
      "Right to Deletion: Request deletion of your personal information, Close your account (Note: Some data may be retained for legal compliance - tax records, transaction history as required by law), and Request removal of survey responses.",
      "Right to Object: Object to processing of your personal information, Opt-out of marketing communications at any time, Withdraw consent for location tracking, and Opt-out of non-essential cookies.",
      "Right to Data Portability: Receive your data in a commonly used format, Transfer your data to another service provider.",
      "How to Exercise Your Rights: Through your Account Settings dashboard, Email: privacy@triptravelandtours.com, Phone: +632-8683-6213, or Written request to our office. We will respond within 30 days of receiving your request.",
    ],
  },
  {
    title: "10. Data Retention",
    content: [
      "We retain your personal information for as long as necessary to provide our services and comply with legal obligations.",
      "Retention Periods by Data Type: Account Information (While active plus 7 years after closure for legal compliance), Travel Booking Records (7 years for accounting and tax purposes), Bills Payment Records (5 years as required by financial regulations), eLoad Transaction Records (3 years), ET Credits and Rewards History (While active plus 3 years), Survey Responses (3 years or until you request deletion), Location Data (Not stored permanently - used only during active map sessions), Marketing Data (Until you opt-out or withdraw consent), and Customer Support Records (3 years from last interaction).",
      "After the retention period expires, data is securely deleted or anonymized for statistical purposes.",
    ],
  },
  {
    title: "11. Children's Privacy",
    content: [
      "Our services are not directed to children under the age of 18. We do not knowingly collect personal information from children without verifiable parental consent.",
      "For users under 18: Parental or guardian consent is required to create an account, A parent or guardian must make bookings and transactions on behalf of minors, and We collect only information necessary for travel bookings (as required by airlines and hotels).",
      "If we discover that we have collected information from a child without proper consent, we will delete that information promptly. Parents or guardians may contact us to review, delete, or stop collection of their child's information.",
    ],
  },
  {
    title: "12. International Data Transfers",
    content: [
      "Your information may be transferred to and processed in countries other than the Philippines, including: Countries where our cloud servers are located, Countries where our travel partners operate (for booking fulfillment), and Countries where our service providers are based.",
      "When transferring data internationally, we ensure appropriate safeguards: Standard contractual clauses approved by the National Privacy Commission, Data processing agreements with all international partners, Encryption during transfer and storage, and Compliance with Philippine data protection requirements.",
    ],
  },
  {
    title: "13. Third-Party Links and Services",
    content: [
      "Our platform integrates with and contains links to third-party services:",
      "Integrated Services: Travel booking systems (Amadeus, Travelport), Payment gateways (Xendit, UnionBank, Wise), Map services (OpenStreetMap), Biller and telecom networks.",
      "External Links: Airline and hotel websites, Tourism board websites, Blog article references, and Social media platforms.",
      "This Privacy Policy does not apply to third-party services. We encourage you to review the privacy policies of any external services you access. We are not responsible for the privacy practices of third parties.",
    ],
  },
  {
    title: "14. Changes to This Privacy Policy",
    content: [
      "We may update this Privacy Policy to reflect: Changes in our services or data practices, New features (such as additional payment methods or services), Changes in Philippine privacy laws and regulations, and Feedback from users and regulators.",
      "When we make changes, we will: Update the 'Last Updated' date on this page, Notify registered users via email for material changes, Display a prominent notice on our website, and Send in-app notifications.",
      "Your continued use of our services after changes are posted constitutes acceptance of the updated Privacy Policy. We encourage you to review this policy periodically.",
    ],
  },
  {
    title: "15. Data Protection Officer",
    content: [
      "We have appointed a Data Protection Officer (DPO) to oversee our privacy practices and handle your privacy concerns.",
      "Data Protection Officer - Trip Travel & Tours Agency (ET Platform)",
      "Email: dpo@triptravelandtours.com",
      "The DPO is responsible for: Ensuring compliance with the Data Privacy Act, Handling data subject requests, Coordinating with the National Privacy Commission, Conducting privacy impact assessments, and Training staff on data protection.",
    ],
  },
  {
    title: "16. Contact Information and Complaints",
    content: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
      "Trip Travel & Tours Agency (ET Platform)",
      "Address: Unit C And D 4th Floor Commerce And Industry Plaza Building, 1030 Campus Avenue McKinley Town Centre, McKinley Hill, Pinagsama, City of Taguig, Philippines",
      "Phone: +632-8683-6213",
      "General Email: contact@triptravelandtours.com",
      "Privacy Email: privacy@triptravelandtours.com",
      "Website: www.triptravelandtours.com",
      "Filing a Complaint: If you believe we have not handled your personal information properly, you have the right to: Contact us directly to resolve the issue (we aim to respond within 30 days), File a complaint with the National Privacy Commission of the Philippines, or Seek legal remedies as provided by the Data Privacy Act of 2012.",
      "National Privacy Commission: 5th Floor, Philippine International Convention Center (PICC), Vicente Sotto Street, Pasay City, Metro Manila | Phone: (02) 8234-2228 | Email: info@privacy.gov.ph | Website: www.privacy.gov.ph",
    ],
  },
];

const PrivacyPolicy = () => {
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
            Privacy Policy
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
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information across all our services including travel bookings, bills payment, eLoad, and ET Rewards.
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

          {/* Commitment Statement */}
          <Box
            sx={{
              mt: 5,
              p: 3,
              bgcolor: "info.lighter",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "info.main",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "info.dark",
              }}
            >
              Our Commitment to You
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8, color: "text.secondary" }}>
              Your trust is paramount to us. We are committed to transparency in our data practices, implementing robust security measures, and giving you control over your personal information. By using the Trip Travel & Tours Agency ET (Earning While Travelling) platform and its services - including travel bookings, bills payment, eLoad, surveys, and our interactive features - you acknowledge that you have read and understood this Privacy Policy. We comply with the Philippine Data Privacy Act of 2012.
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
            Privacy Questions or Concerns?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
            Our privacy team is dedicated to addressing your data protection needs
          </Typography>
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <EmailIcon sx={{ fontSize: 20 }} />
              <Typography variant="body1">
                privacy@triptravelandtours.com
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

export default PrivacyPolicy;
