"use client";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupIcon from "@mui/icons-material/Group";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "92vh", md: "88vh" },
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #3D1A0A 0%, #6B3A1F 30%, #2D6A4F 70%, #1B4332 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `radial-gradient(circle at 25% 25%, #E07B39 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, #C9920C 0%, transparent 50%)`,
        }}
      />

      {/* Decorative circles */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "2px solid rgba(224, 123, 57, 0.2)",
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "2px solid rgba(45, 106, 79, 0.3)",
          display: { xs: "none", md: "block" },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: 720, py: { xs: 8, md: 4 } }}>
          {/* Registration badge */}
          <Chip
            label={t("regText")}
            size="small"
            sx={{
              mb: 3,
              bgcolor: "rgba(224, 123, 57, 0.15)",
              color: "#F5A673",
              border: "1px solid rgba(224, 123, 57, 0.3)",
              fontSize: { xs: "0.65rem", sm: "0.7rem" },
              height: "auto",
              py: 0.5,
              "& .MuiChip-label": { whiteSpace: "normal", lineHeight: 1.4 },
            }}
          />

          {/* Hindi name */}
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontWeight: 700,
              color: "#E07B39",
              mb: 1,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.3,
            }}
          >
            {t("ngoNameHi")}
          </Typography>

          {/* English name */}
          <Typography
            variant="h4"
            sx={{
              color: "rgba(255,255,255,0.7)",
              mb: 3,
              fontWeight: 400,
              fontSize: { xs: "1.1rem", md: "1.4rem" },
              letterSpacing: "0.05em",
            }}
          >
            {t("ngoNameEn")}
          </Typography>

          {/* Motto */}
          <Box
            sx={{
              display: "inline-block",
              borderLeft: "4px solid #C9920C",
              pl: 2,
              mb: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontWeight: 700,
                color: "#C9920C",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.4rem" },
                lineHeight: 1.2,
              }}
            >
              {t("tagline")}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "rgba(255,255,255,0.6)", mt: 0.5, fontStyle: "italic" }}
            >
              {t("taglineEn")}
            </Typography>
          </Box>

          {/* Mission statement */}
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.8)",
              mb: 4,
              maxWidth: 600,
              lineHeight: 1.8,
              fontSize: { xs: "0.95rem", md: "1.05rem" },
            }}
          >
            {t("subtitle")}
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ flexWrap: "wrap", gap: 1.5 }}
          >
            <Button
              component={Link}
              href={`/${locale}/donate`}
              variant="contained"
              size="large"
              startIcon={<VolunteerActivismIcon />}
              sx={{
                fontSize: { xs: "0.95rem", md: "1rem" },
                py: 1.5,
                px: 3.5,
                minHeight: 52,
                background: "linear-gradient(135deg, #E07B39 0%, #C9920C 100%)",
                boxShadow: "0 4px 20px rgba(224, 123, 57, 0.5)",
                "&:hover": {
                  background: "linear-gradient(135deg, #C9920C 0%, #E07B39 100%)",
                  boxShadow: "0 6px 24px rgba(224, 123, 57, 0.6)",
                },
              }}
            >
              {t("ctaDonate")}
            </Button>
            <Button
              component={Link}
              href={`/${locale}/volunteer`}
              variant="outlined"
              size="large"
              startIcon={<GroupIcon />}
              sx={{
                fontSize: { xs: "0.95rem", md: "1rem" },
                py: 1.5,
                px: 3.5,
                minHeight: 52,
                borderColor: "rgba(255,255,255,0.5)",
                color: "#fff",
                "&:hover": {
                  borderColor: "#E07B39",
                  bgcolor: "rgba(224, 123, 57, 0.1)",
                },
              }}
            >
              {t("ctaVolunteer")}
            </Button>
            <Button
              component={Link}
              href={`/${locale}/membership`}
              variant="outlined"
              size="large"
              startIcon={<FavoriteIcon />}
              sx={{
                fontSize: { xs: "0.95rem", md: "1rem" },
                py: 1.5,
                px: 3.5,
                minHeight: 52,
                borderColor: "rgba(45, 106, 79, 0.7)",
                color: "#52B788",
                "&:hover": {
                  borderColor: "#52B788",
                  bgcolor: "rgba(45, 106, 79, 0.1)",
                },
              }}
            >
              {t("ctaMember")}
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Bottom wave */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: "linear-gradient(to top, #FFFBF5, transparent)",
        }}
      />
    </Box>
  );
}
