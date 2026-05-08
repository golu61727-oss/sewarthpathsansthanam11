"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
} from "@mui/material";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const presetAmounts = [251, 501, 1001, 2100, 5001];

export default function DonationForm() {
  const t = useTranslations("donate");
  const locale = useLocale();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(501);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "general",
    pan: "",
    anonymous: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 1) {
      setError("Please select or enter a valid donation amount.");
      return;
    }
    if (!form.name || !form.email) {
      setError("Name and email are required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          donorName: form.name,
          donorEmail: form.email,
          donorPhone: form.phone,
          purpose: form.purpose,
          pan: form.pan,
          isAnonymous: form.anonymous,
          type: "donation",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create order");

      // Load Razorpay
      const win = window as unknown as {
        Razorpay: new (opts: object) => { open: () => void };
      };
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "सेवार्थ पथ संस्थानम्",
        description: `Donation — ${form.purpose}`,
        order_id: data.orderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#E07B39" },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, donationId: data.donationId }),
          });
          if (verifyRes.ok) setSuccess(true);
          else setError("Payment verification failed. Contact support.");
        },
      };

      if (typeof win.Razorpay !== "undefined") {
        const rzp = new win.Razorpay(options);
        rzp.open();
      } else {
        // Fallback: simulate success for demo
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card sx={{ p: 4, textAlign: "center" }}>
        <VolunteerActivismIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          {t("successTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("successSubtitle")}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => { setSuccess(false); setSelectedAmount(501); setCustomAmount(""); }}
        >
          {locale === "hi" ? "एक और दान करें" : "Donate Again"}
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t("title")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t("subtitle")}
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Amount selection */}
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
            {t("amountLabel")}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
            {presetAmounts.map((amt) => (
              <Chip
                key={amt}
                label={`₹${amt.toLocaleString("en-IN")}`}
                onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                sx={{
                  height: 44,
                  px: 1,
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  bgcolor: selectedAmount === amt && !customAmount ? "primary.main" : "transparent",
                  color: selectedAmount === amt && !customAmount ? "#fff" : "primary.main",
                  border: "2px solid",
                  borderColor: selectedAmount === amt && !customAmount ? "primary.main" : "primary.light",
                  cursor: "pointer",
                  "&:hover": { bgcolor: selectedAmount === amt && !customAmount ? "primary.dark" : "primary.light", color: selectedAmount === amt && !customAmount ? "#fff" : "#fff" },
                }}
              />
            ))}
          </Stack>
          <TextField
            label={t("customPlaceholder")}
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value.replace(/\D/g, "")); setSelectedAmount(null); }}
            size="small"
            type="number"
            inputProps={{ min: 1 }}
            sx={{ mb: 3, maxWidth: 200 }}
          />

          <Stack spacing={2.5}>
            <TextField
              label={t("nameLabel")}
              required
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              label={t("emailLabel")}
              type="email"
              required
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label={t("phoneLabel")}
              fullWidth
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>{t("purposeLabel")}</InputLabel>
              <Select
                value={form.purpose}
                label={t("purposeLabel")}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              >
                {Object.entries({
                  general: locale === "hi" ? "सामान्य निधि" : "General Fund",
                  education: locale === "hi" ? "शिक्षा" : "Education",
                  health: locale === "hi" ? "स्वास्थ्य" : "Health & Medical",
                  women: locale === "hi" ? "महिला सशक्तिकरण" : "Women Empowerment",
                  environment: locale === "hi" ? "पर्यावरण" : "Environment",
                  culture: locale === "hi" ? "संस्कृति" : "Culture & Heritage",
                }).map(([value, label]) => (
                  <MenuItem key={value} value={value}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label={t("panLabel")}
              fullWidth
              value={form.pan}
              onChange={(e) => setForm({ ...form, pan: e.target.value.toUpperCase() })}
              inputProps={{ maxLength: 10 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.anonymous}
                  onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
                />
              }
              label={t("anonymousLabel")}
            />
          </Stack>

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading || (!finalAmount && !customAmount)}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <VolunteerActivismIcon />}
            sx={{ mt: 3, py: 1.75, fontSize: "1.05rem", fontWeight: 700, minHeight: 52 }}
          >
            {loading
              ? (locale === "hi" ? "प्रक्रिया में..." : "Processing...")
              : `${t("submit")} ${finalAmount ? `— ₹${finalAmount.toLocaleString("en-IN")}` : ""}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
