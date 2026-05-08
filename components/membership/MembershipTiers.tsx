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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const tiers = [
  {
    key: "volunteer",
    color: "#2D6A4F",
    featured: false,
    planCode: "VOL_FREE",
    price: 0,
  },
  {
    key: "annual",
    color: "#E07B39",
    featured: true,
    planCode: "ANNUAL_365",
    price: 365,
  },
  {
    key: "supporter",
    color: "#C9920C",
    featured: false,
    planCode: "SUPPORTER_1001",
    price: 1001,
  },
  {
    key: "lifetime",
    color: "#6B3A1F",
    featured: false,
    planCode: "LIFETIME_5001",
    price: 5001,
  },
];

export default function MembershipTiers() {
  const t = useTranslations("membership");
  const locale = useLocale();
  const [selectedTier, setSelectedTier] = useState<(typeof tiers)[0] | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", state: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = (tier: (typeof tiers)[0]) => {
    setSelectedTier(tier);
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      setError("Name and email are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/memberships/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, planCode: selectedTier?.planCode, amount: selectedTier?.price }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      if (selectedTier?.price === 0) {
        setSuccess(true);
        return;
      }

      // Open Razorpay
      const win = window as unknown as { Razorpay: new (opts: object) => { open: () => void } };
      const opts = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "सेवार्थ पथ संस्थानम्",
        description: `${selectedTier?.planCode} Membership`,
        order_id: data.orderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: selectedTier?.color || "#E07B39" },
        handler: async (response: object) => {
          await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, membershipId: data.membershipId }),
          });
          setSuccess(true);
        },
      };
      if (typeof win.Razorpay !== "undefined") {
        new win.Razorpay(opts).open();
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>{t("title")}</Typography>
          <hr className="section-divider" style={{ margin: "12px auto 16px" }} />
          <Typography variant="subtitle1" color="text.secondary">{t("subtitle")}</Typography>
        </Box>
        <Grid container spacing={3} alignItems="stretch">
          {tiers.map((tier) => {
            const tierData = t.raw(`tiers.${tier.key}`) as {
              name: string; nameHi: string; price: string; period: string; tagline: string; benefits: string[];
            };
            return (
              <Grid item xs={12} sm={6} md={3} key={tier.key}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: tier.featured ? `2px solid ${tier.color}` : "1px solid",
                    borderColor: tier.featured ? tier.color : "grey.200",
                    position: "relative",
                    overflow: "visible",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-6px)", boxShadow: `0 12px 40px ${tier.color}30` },
                  }}
                >
                  {tier.featured && (
                    <Chip
                      label={locale === "hi" ? "सबसे लोकप्रिय" : "Most Popular"}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        bgcolor: tier.color,
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        zIndex: 1,
                      }}
                    />
                  )}
                  {tier.featured && (
                    <Box sx={{ height: 4, background: `linear-gradient(90deg, ${tier.color}, #C9920C)` }} />
                  )}
                  <CardContent sx={{ flex: 1, p: 3 }}>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="caption" sx={{ color: tier.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {tierData.tagline}
                        </Typography>
                        <Typography variant="h6" fontWeight={700} sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", mt: 0.25 }}>
                          {locale === "hi" ? tierData.nameHi : tierData.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h3" fontWeight={800} sx={{ color: tier.color, lineHeight: 1 }}>
                          {tierData.price}
                        </Typography>
                        {tierData.period && (
                          <Typography variant="caption" color="text.secondary">{tierData.period}</Typography>
                        )}
                      </Box>
                      <List dense disablePadding>
                        {tierData.benefits.map((b, i) => (
                          <ListItem key={i} disablePadding sx={{ py: 0.4 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <CheckCircleIcon sx={{ color: tier.color, fontSize: 16 }} />
                            </ListItemIcon>
                            <ListItemText primary={b} primaryTypographyProps={{ variant: "caption", sx: { lineHeight: 1.5 } }} />
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant={tier.featured ? "contained" : "outlined"}
                      onClick={() => handleJoin(tier)}
                      sx={{
                        bgcolor: tier.featured ? tier.color : "transparent",
                        borderColor: tier.color,
                        color: tier.featured ? "#fff" : tier.color,
                        "&:hover": { bgcolor: tier.featured ? `${tier.color}dd` : `${tier.color}11` },
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

        {/* Registration Dialog */}
        <Dialog open={!!selectedTier} onClose={() => setSelectedTier(null)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={700}>
                {locale === "hi" ? "सदस्यता पंजीकरण" : "Membership Registration"}
              </Typography>
              <Button onClick={() => setSelectedTier(null)} size="small" color="inherit">
                <CloseIcon />
              </Button>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {success ? (
              <Box sx={{ textAlign: "center", py: 3 }}>
                <CheckCircleIcon sx={{ fontSize: 56, color: "secondary.main", mb: 2 }} />
                <Typography variant="h6" fontWeight={700} color="secondary">
                  {locale === "hi" ? "सफलतापूर्वक पंजीकृत!" : "Successfully Registered!"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {locale === "hi" ? "आपकी सदस्यता की पुष्टि ईमेल पर भेजी जाएगी।" : "Your membership confirmation will be sent to your email."}
                </Typography>
              </Box>
            ) : (
              <Stack spacing={2.5} sx={{ mt: 1 }}>
                {selectedTier && (
                  <Box sx={{ p: 2, bgcolor: `${selectedTier.color}10`, borderRadius: 2, border: `1px solid ${selectedTier.color}30` }}>
                    <Typography variant="body2" fontWeight={600}>
                      Selected: {selectedTier.planCode} —{" "}
                      {selectedTier.price === 0 ? "Free" : `₹${selectedTier.price.toLocaleString("en-IN")}`}
                      {selectedTier.price > 0 && selectedTier.key !== "lifetime" ? "/year" : selectedTier.key === "lifetime" ? " (lifetime)" : ""}
                    </Typography>
                  </Box>
                )}
                <TextField label="Full Name / पूरा नाम" required fullWidth value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <TextField label="Email / ईमेल" type="email" required fullWidth value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <TextField label="Phone / WhatsApp" fullWidth value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Stack direction="row" spacing={2}>
                  <TextField label="City / शहर" fullWidth value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  <TextField label="State / राज्य" fullWidth value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                </Stack>
                {error && <Alert severity="error">{error}</Alert>}
              </Stack>
            )}
          </DialogContent>
          {!success && (
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button onClick={() => setSelectedTier(null)} color="inherit">Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
                sx={{ bgcolor: selectedTier?.color, "&:hover": { bgcolor: selectedTier?.color } }}
              >
                {selectedTier?.price === 0
                  ? (locale === "hi" ? "पंजीकरण करें" : "Register Free")
                  : (locale === "hi" ? "भुगतान करें" : `Pay ₹${selectedTier?.price.toLocaleString("en-IN")}`)}
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </Container>
    </Box>
  );
}
