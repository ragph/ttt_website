import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Alert,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import { SectionHeaderWithChip } from '../components/SectionHeader';

const contactInfo = [
  {
    icon: LocationOnIcon,
    title: "Visit Us",
    details:
      "Unit C And D 4th Floor Commerce And Industry Plaza Building 1030 Campus Avenue Mckinley Town Centre Mckinley Hill, Pinagsama, City Of Taguig, Philippines",
  },
  {
    icon: PhoneIcon,
    title: "Call Us",
    details: "+632-8683-6213",
  },
  {
    icon: EmailIcon,
    title: "Email Us",
    details: "contact@triptravelandtours.com",
  },
];

const subjects = [
  "General Inquiry",
  "Booking Assistance",
  "ET Credits Question",
  "Technical Support",
  "Partnership",
  "Other",
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    show: false,
    message: "",
    severity: "success",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showAlert = (message: string, severity: "success" | "error", duration = 5000) => {
    setAlert({ show: true, message, severity });
    setTimeout(() => {
      setAlert({ show: false, message: "", severity: "success" });
    }, duration);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim values
    const trimmedData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
    };

    // Validate email
    if (!validateEmail(trimmedData.email)) {
      showAlert("Please enter a valid email address.", "error");
      return;
    }

    // Validate required fields
    if (!trimmedData.firstName || !trimmedData.lastName || !trimmedData.subject || !trimmedData.message) {
      showAlert("Please fill in all required fields.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for webhook
      const webhookData = {
        to: "reynon.alfredo@gmail.com",
        subject: `Contact Form: ${trimmedData.subject}`,
        contentType: "HTML",
        firstName: trimmedData.firstName,
        lastName: trimmedData.lastName,
        email: trimmedData.email,
        phone: trimmedData.phone || "Not provided",
        formSubject: trimmedData.subject,
        message: trimmedData.message,
      };

      // Send to Make.com webhook
      const response = await fetch(
        "https://hook.us2.make.com/i2iuhkhhuo5uajy1ryl18r7mx1ss3l49",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        }
      );

      if (response.ok) {
        // Show success message
        showAlert(
          `Thank you for contacting us, ${trimmedData.firstName}! We'll get back to you within 24 hours at ${trimmedData.email}.`,
          "success",
          5000
        );
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      showAlert(
        "Sorry, there was an error sending your message. Please try again or contact us directly at contact@earningwhiletravelling.com",
        "error",
        5000
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 20 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, sm: 5, md: 6 }}>
          {/* Left Side - Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box>
              <SectionHeaderWithChip
                chip="Get In Touch"
                title={
                  <>
                    Have Questions?
                    <br />
                    Contact Us Today
                  </>
                }
                subtitle="Our team is here to help you with any questions about bookings, rewards, or your ET account. Reach out and we'll get back to you within 24 hours."
                align="left"
                containerSx={{ mb: 5 }}
              />

              {/* Contact Info Blocks */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 44, sm: 50, md: 56 },
                          height: { xs: 44, sm: 50, md: 56 },
                          borderRadius: 2,
                          background: "linear-gradient(135deg, #3b82f6, #1e40af)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon sx={{ fontSize: { xs: 22, sm: 25, md: 28 }, color: "secondary.main" }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 0.5,
                          }}
                        >
                          {info.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#6B7280",
                          }}
                        >
                          {info.details}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              sx={{
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                {alert.show && (
                  <Alert severity={alert.severity} sx={{ mb: 3 }}>
                    {alert.message}
                  </Alert>
                )}
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        First Name
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="John"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        Last Name
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="Doe"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        Email Address
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="john.doe@example.com"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        Phone Number
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="+63 xxx xxx xxxx"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        Subject
                      </Typography>
                      <TextField
                        fullWidth
                        select
                        placeholder="Select a topic"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select a topic
                        </MenuItem>
                        {subjects.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        Message
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="Tell us how we can help you..."
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={5}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={isSubmitting}
                        endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                        color="primary"
                        sx={{
                          py: 1.8,
                          borderRadius: 999,
                          textTransform: "none",
                          fontSize: "1.05rem",
                          fontWeight: 600,
                        }}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
