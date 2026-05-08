"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import WomanIcon from "@mui/icons-material/Woman";
import ParkIcon from "@mui/icons-material/Park";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { useTranslations } from "next-intl";

const programs = [
  { key: "education", icon: SchoolIcon, color: "#E07B39" },
  { key: "health", icon: HealthAndSafetyIcon, color: "#2D6A4F" },
  { key: "women", icon: WomanIcon, color: "#C9920C" },
  { key: "environment", icon: ParkIcon, color: "#52B788" },
  { key: "culture", icon: AutoStoriesIcon, color: "#6B3A1F" },
  { key: "social", icon: HandshakeIcon, color: "#E07B39" },
];

export default function ProgramsSection() {
  const t = useTranslations("programs");

  return (
    <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ mb: 1, color: "text.primary" }}
          >
            {t("title")}
          </Typography>
          <hr className="section-divider" style={{ margin: "12px auto 16px" }} />
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
            {t("subtitle")}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {programs.map(({ key, icon: Icon, color }) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.100",
                  transition: "all 0.25s",
                  cursor: "default",
                  "&:hover": {
                    boxShadow: `0 8px 32px ${color}22`,
                    transform: "translateY(-4px)",
                    borderColor: color,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 2,
                        bgcolor: `${color}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon sx={{ color, fontSize: 28 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                      {t(`${key}.title`)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {t(`${key}.desc`)}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
