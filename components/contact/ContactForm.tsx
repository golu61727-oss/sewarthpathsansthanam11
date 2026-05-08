"use client";
import {
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
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { useLocale } from "next-intl";

const subjects = [
  { en: "General Inquiry", hi: "सामान्य प्रश्न" },
  { en: "Volunteer Information", hi: "स्वयंसेवक जानकारी" },
  { en: "Membership", hi: "सदस्यता" },
  { en: "Donation", hi: "दान" },
  { en: "Partnership / CSR", hi: "साझेदारी / CSR" },
  { en: "Media / Press", hi: "मीडिया / प्रेस" },
  { en: "Other", hi: "अन्य" },
];

export default function ContactForm() {
  const locale = useLocale();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Name, email, and message are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSuccess(true);
      else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card sx={{ p: 4, textAlign: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 64, color: "#2D6A4F", mb: 2 }} />
        <Typography variant="h5" fontWeight={700} color="secondary" gutterBottom>
          {locale === "hi" ? "संदेश भेजा गया!" : "Message Sent!"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {locale === "hi"
            ? "हम जल्द ही आपसे संपर्क करेंगे।"
            : "We'll get back to you as soon as possible."}
        </Typography>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {locale === "hi" ? "संदेश भेजें" : "Send a Message"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {locale === "hi"
            ? "हम आमतौर पर 24–48 घंटों में जवाब देते हैं।"
            : "We typically respond within 24–48 hours."}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label={locale === "hi" ? "पूरा नाम" : "Full Name"}
                required
                fullWidth
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <TextField
                label={locale === "hi" ? "ईमेल" : "Email"}
                type="email"
                required
                fullWidth
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label={locale === "hi" ? "फोन नंबर" : "Phone Number"}
                fullWidth
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>{locale === "hi" ? "विषय" : "Subject"}</InputLabel>
                <Select
                  value={form.subject}
                  label={locale === "hi" ? "विषय" : "Subject"}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                >
                  {subjects.map((s) => (
                    <MenuItem key={s.en} value={s.en}>
                      {locale === "hi" ? s.hi : s.en}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <TextField
              label={locale === "hi" ? "संदेश" : "Message"}
              required
              multiline
              rows={5}
              fullWidth
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </Stack>

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              sx={{
                py: 1.75,
                px: 4,
                fontSize: "1rem",
                fontWeight: 700,
                bgcolor: "#E07B39",
                "&:hover": { bgcolor: "#c96d2f" },
              }}
            >
              {loading
                ? (locale === "hi" ? "भेजा जा रहा है..." : "Sending...")
                : (locale === "hi" ? "संदेश भेजें" : "Send Message")}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
