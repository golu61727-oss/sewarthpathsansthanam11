"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Link as MuiLink,
  Divider,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const quickLinks = [
    { label: locale === "hi" ? "होम" : "Home", href: `/${locale}` },
    { label: locale === "hi" ? "हमारे बारे में" : "About Us", href: `/${locale}/about` },
    { label: locale === "hi" ? "कार्यक्रम" : "Programs", href: `/${locale}/programs` },
    { label: locale === "hi" ? "आयोजन" : "Events", href: `/${locale}/events` },
    { label: locale === "hi" ? "संपर्क" : "Contact", href: `/${locale}/contact` },
  ];

  const involvedLinks = [
    { label: locale === "hi" ? "स्वयंसेवक बनें" : "Volunteer", href: `/${locale}/volunteer` },
    { label: locale === "hi" ? "सदस्यता" : "Membership", href: `/${locale}/membership` },
    { label: locale === "hi" ? "दान करें" : "Donate", href: `/${locale}/donate` },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1A0A00",
        color: "#f5f5f5",
        pt: 6,
        pb: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #E07B39, #C9920C)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FavoriteIcon sx={{ color: "#fff", fontSize: 24 }} />
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    fontWeight: 700,
                    color: "#E07B39",
                  }}
                >
                  सेवार्थ पथ संस्थानम्
                </Typography>
                <Typography variant="caption" sx={{ color: "#aaa" }}>
                  Sewarth Path Sansthanam
                </Typography>
              </Box>
            </Stack>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                color: "#C9920C",
                mb: 1,
                fontStyle: "italic",
              }}
            >
              "{t("tagline")}"
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <LocationOnIcon sx={{ color: "#E07B39", fontSize: 18, mt: 0.3, flexShrink: 0 }} />
                <Typography variant="caption" sx={{ color: "#bbb", lineHeight: 1.6 }}>
                  {t("address")}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon sx={{ color: "#E07B39", fontSize: 18 }} />
                <Typography variant="caption" sx={{ color: "#bbb" }}>{t("phone")}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon sx={{ color: "#E07B39", fontSize: 18 }} />
                <Typography variant="caption" sx={{ color: "#bbb" }}>{t("email")}</Typography>
              </Stack>
            </Stack>
            {/* WhatsApp */}
            <IconButton
              component="a"
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919454222116"}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ bgcolor: "#25D366", color: "#fff", mt: 2, "&:hover": { bgcolor: "#128C7E" } }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#E07B39", mb: 2 }}>
              {t("quickLinks")}
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map((link) => (
                <MuiLink
                  key={link.href}
                  component={Link}
                  href={link.href}
                  sx={{ color: "#bbb", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#E07B39" } }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Get Involved */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#E07B39", mb: 2 }}>
              {locale === "hi" ? "जुड़ें" : "Get Involved"}
            </Typography>
            <Stack spacing={1}>
              {involvedLinks.map((link) => (
                <MuiLink
                  key={link.href}
                  component={Link}
                  href={link.href}
                  sx={{ color: "#bbb", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#E07B39" } }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Registration */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#E07B39", mb: 2 }}>
              {locale === "hi" ? "पंजीकरण विवरण" : "Registration Details"}
            </Typography>
            <Box
              sx={{
                bgcolor: "rgba(224, 123, 57, 0.08)",
                border: "1px solid rgba(224, 123, 57, 0.25)",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="caption" sx={{ color: "#bbb", display: "block", mb: 0.5 }}>
                {locale === "hi" ? "पंजीकरण सं." : "Registration No."}: 202200996052093
              </Typography>
              <Typography variant="caption" sx={{ color: "#bbb", display: "block", mb: 0.5 }}>
                {locale === "hi" ? "अधिनियम" : "Act"}: Indian Trusts Act, 1882
              </Typography>
              <Typography variant="caption" sx={{ color: "#bbb", display: "block", mb: 0.5 }}>
                {locale === "hi" ? "संस्थापक" : "Founder"}: Shri Mahesh Kumar Pandey
              </Typography>
              <Typography variant="caption" sx={{ color: "#bbb", display: "block" }}>
                {locale === "hi" ? "कार्यक्षेत्र" : "Working Area"}: All India (सम्पूर्ण भारत)
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 1 }}>
          <Typography variant="caption" sx={{ color: "#888" }}>{t("copyright")}</Typography>
          <Typography variant="caption" sx={{ color: "#666" }}>{t("regInfo")}</Typography>
        </Box>
      </Container>
    </Box>
  );
}
