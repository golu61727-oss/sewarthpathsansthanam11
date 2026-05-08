"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const tiers = [
  { key: "volunteer", featured: false, color: "#2D6A4F" },
  { key: "annual", featured: true, color: "#E07B39" },
  { key: "supporter", featured: false, color: "#C9920C" },
  { key: "lifetime", featured: false, color: "#6B3A1F" },
];

export default function MembershipPreview() {
  const t = useTranslations("membership");
  const locale = useLocale();

  return (
    <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
            {t("title")}
          </Typography>
          <hr className="section-divider" style={{ margin: "12px auto 16px" }} />
          <Typography variant="subtitle1" color="text.secondary">
            {t("subtitle")}
          </Typography>
        </Box>
        <Grid container spacing={3} alignItems="stretch">
          {tiers.map(({ key, featured, color }) => {
            const tierData = t.raw(`tiers.${key}`) as {
              name: string;
              nameHi: string;
              price: string;
              period: string;
              tagline: string;
              benefits: string[];
            };
            return (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: featured ? `2px solid ${color}` : "1px solid",
                    borderColor: featured ? color : "grey.200",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-4px)", boxShadow: `0 8px 32px ${color}22` },
                  }}
                >
                  {featured && (
                    <>
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: `linear-gradient(90deg, ${color}, #C9920C)`,
                        }}
                      />
                      <Chip
                        label={locale === "hi" ? "सबसे लोकप्रिय" : "Most Popular"}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          bgcolor: color,
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                        }}
                      />
                    </>
                  )}
                  <CardContent sx={{ flex: 1, p: 3, pt: featured ? 4 : 3 }}>
                    <Stack spacing={2}>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}
                        >
                          {tierData.tagline}
                        </Typography>
                        <Typography
                          variant="h6"
                          fontWeight={700}
                          sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: 1.3 }}
                        >
                          {locale === "hi" ? tierData.nameHi : tierData.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h4" fontWeight={800} sx={{ color }}>
                          {tierData.price}
                        </Typography>
                        {tierData.period && (
                          <Typography variant="caption" color="text.secondary">
                            {tierData.period}
                          </Typography>
                        )}
                      </Box>
                      <List dense disablePadding>
                        {tierData.benefits.map((benefit, i) => (
                          <ListItem key={i} disablePadding sx={{ py: 0.25 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <CheckCircleIcon sx={{ color, fontSize: 16 }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={benefit}
                              primaryTypographyProps={{ variant: "caption", sx: { lineHeight: 1.5 } }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={Link}
                      href={`/${locale}/membership`}
                      fullWidth
                      variant={featured ? "contained" : "outlined"}
                      sx={{
                        bgcolor: featured ? color : "transparent",
                        borderColor: color,
                        color: featured ? "#fff" : color,
                        "&:hover": {
                          bgcolor: featured ? `${color}dd` : `${color}11`,
                        },
                      }}
                    >
                      {locale === "hi" ? "अभी जुड़ें" : "Join Now"}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
