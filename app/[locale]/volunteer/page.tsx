import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VolunteerForm from "@/components/volunteer/VolunteerForm";
import { Box, Container, Grid, Typography, Stack, Card, CardContent } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HandshakeIcon from "@mui/icons-material/Handshake";

export default function VolunteerPage() {
  return (
    <>
      <Navbar />
      <main>
        <Box
          sx={{
            py: 10,
            background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "#52B788", fontWeight: 700, mb: 1 }}
            >
              स्वयंसेवक बनें
            </Typography>
            <Typography variant="h4" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 400, mb: 2 }}>
              Join as a Volunteer
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
              बदलाव का हिस्सा बनें — Be the change you wish to see
            </Typography>
          </Container>
        </Box>

        <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              {/* Left */}
              <Grid item xs={12} md={5}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                  Why Volunteer? / क्यों बनें स्वयंसेवक?
                </Typography>
                <Stack spacing={3}>
                  {[
                    {
                      icon: GroupIcon,
                      title: "Join 500+ Volunteers",
                      titleHi: "500+ स्वयंसेवकों से जुड़ें",
                      desc: "Be part of a growing community of dedicated changemakers.",
                    },
                    {
                      icon: EmojiEventsIcon,
                      title: "Recognition & Certificates",
                      titleHi: "पहचान एवं प्रमाण पत्र",
                      desc: "Get digital ID cards, certificates, and official recognition.",
                    },
                    {
                      icon: HandshakeIcon,
                      title: "Real Impact",
                      titleHi: "वास्तविक प्रभाव",
                      desc: "Directly help communities in Varanasi and across India.",
                    },
                  ].map(({ icon: Icon, title, titleHi, desc }) => (
                    <Card key={title} sx={{ border: "1px solid rgba(45,106,79,0.15)" }}>
                      <CardContent sx={{ p: 2.5, display: "flex", gap: 2 }}>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            bgcolor: "rgba(45,106,79,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon sx={{ color: "secondary.main", fontSize: 24 }} />
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={700}>{title}</Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "secondary.main", display: "block", fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                          >
                            {titleHi}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">{desc}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </Grid>
              {/* Right */}
              <Grid item xs={12} md={7}>
                <VolunteerForm />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
