import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import TrusteesSection from "@/components/home/TrusteesSection";

export default function AboutPage() {
  const milestones = [
    { year: "2022", event: "Trust registered under Indian Trusts Act 1882", eventHi: "भारतीय न्यास अधिनियम 1882 के अंतर्गत न्यास पंजीकृत" },
    { year: "2022", event: "Inaugural social welfare programs launched in Varanasi", eventHi: "वाराणसी में प्रारंभिक सामाजिक कल्याण कार्यक्रमों का शुभारंभ" },
    { year: "2023", event: "Health camps organized for underprivileged communities", eventHi: "वंचित समुदायों के लिए स्वास्थ्य शिविरों का आयोजन" },
    { year: "2024", event: "Educational programs expanded; 500+ students benefited", eventHi: "शैक्षिक कार्यक्रमों का विस्तार; 500+ छात्र लाभान्वित" },
    { year: "2025", event: "Digital platform launched for wider reach", eventHi: "व्यापक पहुंच के लिए डिजिटल प्लेटफॉर्म लॉन्च" },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <Box
          sx={{
            py: 10,
            background: "linear-gradient(135deg, #3D1A0A 0%, #2D6A4F 100%)",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "#E07B39", fontWeight: 700, mb: 1 }}
            >
              हमारे बारे में
            </Typography>
            <Typography variant="h4" sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 400 }}>
              About Sewarth Path Sansthanam
            </Typography>
          </Container>
        </Box>

        {/* Story */}
        <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 3, color: "primary.main" }}>
                  हमारी कहानी — Our Story
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 3, color: "text.secondary" }}>
                  Founded by <strong>Shri Mahesh Kumar Pandey</strong>, Sewarth Path Sansthanam (सेवार्थ पथ संस्थानम्) is a registered public charitable trust under the Indian Trusts Act 1882, rooted in the sacred city of Varanasi, Uttar Pradesh.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.9,
                    mb: 3,
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    color: "text.secondary",
                  }}
                >
                  'सेवा परमो धर्म' के शाश्वत दर्शन से प्रेरित यह संगठन शिक्षा, स्वास्थ्य, सांस्कृतिक संरक्षण और सामाजिक कल्याण के क्षेत्र में अथक कार्य करता है।
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.9, color: "text.secondary" }}>
                  The trust is explicitly secular and inclusive, working for the welfare of all communities — Hindus, Muslims, Sikhs, Jains, Buddhists, and Christians alike — across the entirety of India (सम्पूर्ण भारत).
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 4,
                    bgcolor: "#FFF8F0",
                    border: "1px solid rgba(224, 123, 57, 0.2)",
                    borderRadius: 3,
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                    <VerifiedIcon sx={{ color: "primary.main" }} />
                    <Typography variant="h6" fontWeight={700}>
                      Registration Details / पंजीकरण विवरण
                    </Typography>
                  </Stack>
                  <Divider sx={{ mb: 3 }} />
                  {[
                    { label: "Registration No. / पंजीकरण सं.", value: "202200996052093" },
                    { label: "Act / अधिनियम", value: "Indian Trusts Act, 1882" },
                    { label: "Type / प्रकार", value: "Public Charitable Trust" },
                    { label: "Founder / संस्थापक", value: "Shri Mahesh Kumar Pandey" },
                    { label: "Registered At / पंजीकृत स्थान", value: "Varanasi, Uttar Pradesh" },
                    { label: "Working Area / कार्यक्षेत्र", value: "All India (सम्पूर्ण भारत)" },
                    { label: "Nature / प्रकृति", value: "Non-profit, Non-political, Voluntary" },
                  ].map(({ label, value }) => (
                    <Box key={label} sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Mission */}
        <Box
          sx={{
            py: 8,
            background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={700} sx={{ color: "#fff", mb: 3 }}>
              Our Mission / हमारा मिशन
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.85)",
                mb: 3,
                fontStyle: "italic",
                lineHeight: 1.8,
                fontFamily: "'Noto Sans Devanagari', sans-serif",
              }}
            >
              शिक्षा, स्वास्थ्य सेवा, सांस्कृतिक संरक्षण, महिला सशक्तिकरण और पर्यावरण संरक्षण में जमीनी स्तर पर कार्य करके एक न्यायपूर्ण, शिक्षित, स्वस्थ और आध्यात्मिक रूप से जागरूक समाज का निर्माण करना।
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
              To create a just, educated, healthy, and spiritually aware society through grassroots action in education, healthcare, cultural preservation, women empowerment, and environmental conservation.
            </Typography>
          </Container>
        </Box>

        {/* Timeline */}
        <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight={700} align="center" sx={{ mb: 6 }}>
              हमारी यात्रा — Our Journey
            </Typography>
            <Stack spacing={0}>
              {milestones.map((m, i) => (
                <Box key={i} sx={{ display: "flex", gap: 3, mb: 0 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "0.8rem",
                        flexShrink: 0,
                      }}
                    >
                      {m.year}
                    </Box>
                    {i < milestones.length - 1 && (
                      <Box sx={{ width: 2, flex: 1, minHeight: 32, bgcolor: "primary.light", opacity: 0.4 }} />
                    )}
                  </Box>
                  <Box sx={{ pb: 4 }}>
                    <Typography variant="body1" fontWeight={600} sx={{ mt: 1 }}>{m.event}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", mt: 0.5 }}
                    >
                      {m.eventHi}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Container>
        </Box>

        <TrusteesSection />
      </main>
      <Footer />
    </>
  );
}
