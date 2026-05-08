"use client";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useLocale } from "next-intl";
import Link from "next/link";

const presets = [
  { amount: 251, label: "₹251" },
  { amount: 501, label: "₹501" },
  { amount: 1001, label: "₹1,001" },
  { amount: 2100, label: "₹2,100" },
  { amount: 5001, label: "₹5,001" },
];

export default function DonationCTA() {
  const locale = useLocale();

  return (
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(135deg, #E07B39 0%, #C9920C 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Om pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Container maxWidth="md" sx={{ position: "relative", textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            color: "#fff",
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "1.6rem", md: "2.2rem" },
          }}
        >
          आपका एक कदम किसी की जिंदगी बदल सकता है
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "rgba(255,255,255,0.85)", mb: 4, fontWeight: 400 }}
        >
          Your one step can change someone's life
        </Typography>

        {/* Quick amount chips */}
        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ mb: 4, gap: 1.5 }}
        >
          {presets.map(({ label }) => (
            <Chip
              key={label}
              label={label}
              component={Link}
              href={`/${locale}/donate`}
              clickable
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                height: 44,
                px: 1,
                border: "1px solid rgba(255,255,255,0.4)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.35)" },
              }}
            />
          ))}
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <Button
            component={Link}
            href={`/${locale}/donate`}
            variant="contained"
            size="large"
            startIcon={<VolunteerActivismIcon />}
            sx={{
              bgcolor: "#fff",
              color: "#E07B39",
              fontWeight: 700,
              fontSize: "1.05rem",
              py: 1.5,
              px: 4,
              minHeight: 52,
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.92)",
              },
            }}
          >
            {locale === "hi" ? "अभी दान करें" : "Donate Now"}
          </Button>
          <Button
            component={Link}
            href={`/${locale}/membership`}
            variant="outlined"
            size="large"
            sx={{
              borderColor: "rgba(255,255,255,0.7)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              py: 1.5,
              px: 4,
              minHeight: 52,
              "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            {locale === "hi" ? "सदस्य बनें" : "Become a Member"}
          </Button>
        </Stack>

        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.65)", display: "block", mt: 3 }}>
          {locale === "hi"
            ? "80G प्रमाण पत्र प्रक्रियाधीन। सभी दानों के लिए रसीद जारी की जाती है।"
            : "80G certification in process. Receipt issued for all donations."}
        </Typography>
      </Container>
    </Box>
  );
}
