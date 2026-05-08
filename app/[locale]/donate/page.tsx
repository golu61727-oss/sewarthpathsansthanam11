import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DonationForm from "@/components/donate/DonationForm";
import { Box, Container, Grid, Typography, Stack, Paper } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <main>
        <Box
          sx={{
            py: 10,
            background: "linear-gradient(135deg, #E07B39 0%, #C9920C 100%)",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "#fff", fontWeight: 700, mb: 1 }}
            >
              दान करें
            </Typography>
            <Typography variant="h4" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 400, mb: 2 }}>
              Support Our Mission
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", maxWidth: 500, mx: "auto" }}>
              आपकी उदारता जीवन बदलती है — Your generosity transforms lives
            </Typography>
          </Container>
        </Box>

        <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              {/* Left — why donate */}
              <Grid item xs={12} md={5}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                  Why Donate / दान क्यों करें?
                </Typography>
                <Stack spacing={2} sx={{ mb: 4 }}>
                  {[
                    { amount: "₹500", impact: "Feeds a family for a week", impactHi: "एक परिवार को एक सप्ताह का भोजन" },
                    { amount: "₹1,000", impact: "Buys books for 5 children", impactHi: "5 बच्चों के लिए किताबें" },
                    { amount: "₹2,500", impact: "Funds a health camp for a day", impactHi: "एक दिन के स्वास्थ्य शिविर का खर्च" },
                    { amount: "₹5,000", impact: "Supports a student for a month", impactHi: "एक महीने के लिए एक छात्र का समर्थन" },
                  ].map(({ amount, impact, impactHi }) => (
                    <Box
                      key={amount}
                      sx={{
                        display: "flex",
                        gap: 2,
                        p: 2,
                        bgcolor: "#FFF8F0",
                        borderRadius: 2,
                        border: "1px solid rgba(224, 123, 57, 0.15)",
                      }}
                    >
                      <Typography fontWeight={800} color="primary" sx={{ minWidth: 70, fontSize: "1.1rem" }}>
                        {amount}
                      </Typography>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{impact}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                          {impactHi}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>

                <Stack spacing={2}>
                  {[
                    { icon: LockIcon, label: "100% Secure & Encrypted Payment" },
                    { icon: ReceiptIcon, label: "Instant receipt on your email" },
                    { icon: VerifiedUserIcon, label: "Registered Public Charitable Trust" },
                  ].map(({ icon: Icon, label }) => (
                    <Stack key={label} direction="row" spacing={1.5} alignItems="center">
                      <Icon sx={{ color: "primary.main", fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">{label}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Paper
                  sx={{
                    p: 2.5,
                    mt: 3,
                    bgcolor: "#FFF8F0",
                    border: "1px solid rgba(224, 123, 57, 0.2)",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", lineHeight: 1.7 }}>
                    <strong>80G Note:</strong> 80G tax exemption certification is currently in process. A receipt will be issued for all donations. You may claim tax benefit once certification is complete.
                    <br /><br />
                    <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
                      80G कर छूट प्रमाणीकरण प्रक्रियाधीन है। सभी दानों के लिए रसीद जारी की जाएगी।
                    </span>
                  </Typography>
                </Paper>
              </Grid>

              {/* Right — form */}
              <Grid item xs={12} md={7}>
                <DonationForm />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
