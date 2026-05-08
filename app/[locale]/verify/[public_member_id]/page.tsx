import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createServiceClient } from "@/lib/supabase/server";
import { Box, Container, Typography, Paper, Stack, Chip, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VerifiedIcon from "@mui/icons-material/Verified";

interface Props {
  params: { public_member_id: string; locale: string };
}

export default async function VerifyPage({ params }: Props) {
  const supabase = await createServiceClient();

  const { data: membership } = await supabase
    .from("memberships")
    .select(`
      id,
      status,
      plan_code,
      created_at,
      expires_at,
      public_member_id,
      profiles (
        full_name,
        email,
        city,
        state
      )
    `)
    .eq("public_member_id", params.public_member_id)
    .maybeSingle();

  const isValid = membership && membership.status === "active";
  const planLabels: Record<string, string> = {
    VOL_FREE: "Volunteer Member",
    ANNUAL_365: "Annual Member",
    SUPPORTER_1001: "Supporter Member",
    LIFETIME_5001: "Lifetime Member",
  };
  const planColors: Record<string, string> = {
    VOL_FREE: "#2D6A4F",
    ANNUAL_365: "#E07B39",
    SUPPORTER_1001: "#C9920C",
    LIFETIME_5001: "#6B3A1F",
  };
  const color = membership ? (planColors[membership.plan_code] || "#E07B39") : "#757575";
  const profile = membership?.profiles as { full_name?: string; email?: string; city?: string; state?: string } | null;

  return (
    <>
      <Navbar />
      <main>
        <Box sx={{ py: 8, bgcolor: "#FFFBF5", minHeight: "70vh" }}>
          <Container maxWidth="sm">
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                Member Verification
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "text.secondary" }}
              >
                सदस्यता सत्यापन
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 4,
                border: `2px solid ${isValid ? color : "#d32f2f"}`,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              {isValid ? (
                <>
                  <CheckCircleIcon sx={{ fontSize: 64, color, mb: 2 }} />
                  <Chip
                    icon={<VerifiedIcon />}
                    label="VERIFIED MEMBER"
                    sx={{ bgcolor: `${color}15`, color, fontWeight: 800, fontSize: "0.85rem", mb: 3, px: 1 }}
                  />
                  <Stack spacing={2} alignItems="center">
                    <Avatar sx={{ width: 72, height: 72, bgcolor: `${color}20`, color, fontSize: "1.75rem", fontWeight: 700 }}>
                      {profile?.full_name?.[0] ?? "?"}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight={700}>{profile?.full_name ?? "Member"}</Typography>
                      {profile?.city && (
                        <Typography variant="body2" color="text.secondary">
                          {profile.city}{profile.state ? `, ${profile.state}` : ""}
                        </Typography>
                      )}
                    </Box>
                    <Chip
                      label={planLabels[membership.plan_code] ?? membership.plan_code}
                      sx={{ bgcolor: color, color: "#fff", fontWeight: 700 }}
                    />
                    <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="caption" color="text.secondary">Member Since</Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {new Date(membership.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                        </Typography>
                      </Box>
                      {membership.expires_at && (
                        <Box sx={{ textAlign: "center" }}>
                          <Typography variant="caption" color="text.secondary">Valid Until</Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {new Date(membership.expires_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                          </Typography>
                        </Box>
                      )}
                      {!membership.expires_at && (
                        <Box sx={{ textAlign: "center" }}>
                          <Typography variant="caption" color="text.secondary">Membership</Typography>
                          <Typography variant="body2" fontWeight={600} sx={{ color }}>Lifetime</Typography>
                        </Box>
                      )}
                    </Stack>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                      ID: {params.public_member_id}
                    </Typography>
                  </Stack>
                </>
              ) : (
                <>
                  <CancelIcon sx={{ fontSize: 64, color: "#d32f2f", mb: 2 }} />
                  <Typography variant="h5" fontWeight={700} color="error" gutterBottom>
                    Not Verified
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    This membership ID could not be verified. The membership may be inactive or the ID may be incorrect.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "text.secondary", mt: 1 }}
                  >
                    यह सदस्यता ID सत्यापित नहीं हो सकी।
                  </Typography>
                </>
              )}
            </Paper>

            <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", mt: 3 }}>
              Verified by Sewarth Path Sansthanam · सेवार्थ पथ संस्थानम्
            </Typography>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
