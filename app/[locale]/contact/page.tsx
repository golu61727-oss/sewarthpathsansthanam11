import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { Box, Container, Grid, Typography, Stack, Paper } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <Box
          sx={{
            py: 10,
            background: "linear-gradient(135deg, #3D1A0A 0%, #6B3A1F 100%)",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "#E07B39", fontWeight: 700, mb: 1 }}
            >
              संपर्क करें
            </Typography>
            <Typography variant="h4" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 400, mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
              हमसे जुड़ें — We'd love to hear from you
            </Typography>
          </Container>
        </Box>

        <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                  Get in Touch / संपर्क विवरण
                </Typography>
                <Stack spacing={3}>
                  {[
                    {
                      icon: LocationOnIcon,
                      title: "Address / पता",
                      lines: ["Sewarth Path Sansthanam", "Varanasi, Uttar Pradesh", "India - 221001"],
                    },
                    {
                      icon: PhoneIcon,
                      title: "Phone / फोन",
                      lines: ["+91 XXXXX XXXXX", "WhatsApp Available"],
                    },
                    {
                      icon: EmailIcon,
                      title: "Email / ईमेल",
                      lines: ["info@sewarthpath.org", "admin@sewarthpath.org"],
                    },
                    {
                      icon: AccessTimeIcon,
                      title: "Working Hours / समय",
                      lines: ["Mon–Sat: 9:00 AM – 6:00 PM", "Sun: 10:00 AM – 2:00 PM"],
                    },
                  ].map(({ icon: Icon, title, lines }) => (
                    <Paper key={title} elevation={0} sx={{ p: 2.5, border: "1px solid rgba(224,123,57,0.2)", borderRadius: 2 }}>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            bgcolor: "rgba(224,123,57,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon sx={{ color: "#E07B39", fontSize: 22 }} />
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>{title}</Typography>
                          {lines.map((line) => (
                            <Typography key={line} variant="body2" color="text.secondary">{line}</Typography>
                          ))}
                        </Box>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} md={8}>
                <ContactForm />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
