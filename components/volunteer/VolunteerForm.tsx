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
  Checkbox,
  FormControlLabel,
  FormGroup,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const interests = [
  { en: "Education", hi: "शिक्षा" },
  { en: "Healthcare", hi: "स्वास्थ्य" },
  { en: "Women Empowerment", hi: "महिला सशक्तिकरण" },
  { en: "Environment", hi: "पर्यावरण" },
  { en: "Music & Culture", hi: "संगीत एवं संस्कृति" },
  { en: "Social Welfare", hi: "सामाजिक कल्याण" },
  { en: "IT/Technology", hi: "आईटी/प्रौद्योगिकी" },
  { en: "Photography", hi: "फोटोग्राफी" },
  { en: "Event Management", hi: "कार्यक्रम प्रबंधन" },
];

const ageGroups = ["18-25", "26-35", "36-45", "46-55", "55+"];
const availabilityOpts = [
  { en: "Weekdays", hi: "सप्ताह के दिन" },
  { en: "Weekends", hi: "सप्ताहांत" },
  { en: "Both", hi: "दोनों" },
  { en: "Flexible", hi: "लचीला" },
];

export default function VolunteerForm() {
  const t = useTranslations("volunteer");
  const locale = useLocale();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    ageGroup: "",
    availability: "",
    howHeard: "",
    message: "",
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError("Name and phone number are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/volunteers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, interests: selectedInterests }),
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
        <GroupIcon sx={{ fontSize: 64, color: "secondary.main", mb: 2 }} />
        <Typography variant="h5" fontWeight={700} color="secondary" gutterBottom>
          {t("successTitle")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("successSubtitle")}
        </Typography>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t("formTitle")}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField label={t("nameLabel")} required fullWidth value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <TextField label={t("phoneLabel")} required fullWidth value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Stack>
            <TextField label={t("emailLabel")} type="email" fullWidth value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField label={t("cityLabel")} fullWidth value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <TextField label={t("stateLabel")} fullWidth value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>{t("ageLabel")}</InputLabel>
                <Select value={form.ageGroup} label={t("ageLabel")} onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}>
                  {ageGroups.map((a) => <MenuItem key={a} value={a}>{a}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>{t("availabilityLabel")}</InputLabel>
                <Select value={form.availability} label={t("availabilityLabel")} onChange={(e) => setForm({ ...form, availability: e.target.value })}>
                  {availabilityOpts.map((a) => (
                    <MenuItem key={a.en} value={a.en}>{locale === "hi" ? a.hi : a.en}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            {/* Interests */}
            <Box>
              <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
                {t("interestsLabel")}
              </Typography>
              <FormGroup row>
                {interests.map((interest) => (
                  <FormControlLabel
                    key={interest.en}
                    control={
                      <Checkbox
                        checked={selectedInterests.includes(interest.en)}
                        onChange={() => toggleInterest(interest.en)}
                        size="small"
                        color="secondary"
                      />
                    }
                    label={locale === "hi" ? interest.hi : interest.en}
                    sx={{ width: { xs: "50%", sm: "33%" }, mr: 0 }}
                  />
                ))}
              </FormGroup>
            </Box>

            <TextField
              label={t("howHeardLabel")}
              fullWidth
              value={form.howHeard}
              onChange={(e) => setForm({ ...form, howHeard: e.target.value })}
            />
            <TextField
              label={locale === "hi" ? "अतिरिक्त संदेश" : "Additional Message (optional)"}
              multiline
              rows={3}
              fullWidth
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </Stack>

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <GroupIcon />}
            sx={{ mt: 3, py: 1.75, fontSize: "1rem", fontWeight: 700, minHeight: 52 }}
          >
            {loading ? "Submitting..." : t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
