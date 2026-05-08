"use client";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTranslations } from "next-intl";

const stats = [
  { icon: GroupIcon, value: "500+", key: "volunteers", color: "#E07B39" },
  { icon: PeopleIcon, value: "200+", key: "members", color: "#2D6A4F" },
  { icon: EventIcon, value: "50+", key: "events", color: "#C9920C" },
  { icon: FavoriteIcon, value: "1000+", key: "beneficiaries", color: "#6B3A1F" },
];

export default function ImpactStats() {
  const t = useTranslations("impact");

  return (
    <Box
      sx={{
        py: 6,
        background: "linear-gradient(135deg, #1A0A00 0%, #3D1A0A 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: "#fff",
            mb: 4,
            fontWeight: 600,
            "& span": { color: "#E07B39" },
          }}
        >
          {t("title")} <span>—</span> <span style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>हमारा प्रभाव</span>
        </Typography>
        <Grid container spacing={3}>
          {stats.map(({ icon: Icon, value, key, color }) => (
            <Grid item xs={6} md={3} key={key}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.05)",
                  border: `1px solid rgba(${color === "#E07B39" ? "224,123,57" : color === "#2D6A4F" ? "45,106,79" : "201,146,12"},0.25)`,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <Stack alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      bgcolor: `${color}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon sx={{ color, fontSize: 28 }} />
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 800, color, lineHeight: 1 }}
                  >
                    {value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                    {t(key)}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
