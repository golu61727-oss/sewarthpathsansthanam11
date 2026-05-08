import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MembershipTiers from "@/components/membership/MembershipTiers";
import { Box, Container, Typography } from "@mui/material";

export default function MembershipPage() {
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
              सदस्यता
            </Typography>
            <Typography variant="h4" sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 400, mb: 2 }}>
              Membership
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.65)" }}>
              हमारे परिवार से जुड़ें — Join our family of dedicated changemakers
            </Typography>
          </Container>
        </Box>
        <MembershipTiers />
      </main>
      <Footer />
    </>
  );
}
