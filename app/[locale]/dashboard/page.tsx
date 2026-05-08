import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
  Button,
  Avatar,
} from "@mui/material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import VerifiedIcon from "@mui/icons-material/Verified";
import Link from "next/link";

export default async function DashboardPage({ params }: { params: { locale: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${params.locale}/login`);
  }

  const serviceClient = await createServiceClient();

  const [{ data: profile }, { data: memberships }, { data: donations }] = await Promise.all([
    serviceClient.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    serviceClient.from("memberships").select("*").eq("profile_id", user.id).order("created_at", { ascending: false }),
    serviceClient.from("donations").select("*").eq("profile_id", user.id).order("created_at", { ascending: false }).limit(5),
  ]);

  const activeMembership = memberships?.find((m) => m.status === "active");
  const totalDonated = donations?.filter((d) => d.status === "completed").reduce((acc, d) => acc + d.amount, 0) ?? 0;

  const planLabels: Record<string, string> = {
    VOL_FREE: "Volunteer",
    ANNUAL_365: "Annual",
    SUPPORTER_1001: "Supporter",
    LIFETIME_5001: "Lifetime",
  };
  const planColors: Record<string, string> = {
    VOL_FREE: "#2D6A4F",
    ANNUAL_365: "#E07B39",
    SUPPORTER_1001: "#C9920C",
    LIFETIME_5001: "#6B3A1F",
  };

  return (
    <>
      <Navbar />
      <main>
        <Box sx={{ bgcolor: "#FFFBF5", minHeight: "80vh", py: 6 }}>
          <Container maxWidth="lg">
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }} sx={{ mb: 5 }}>
              <Avatar
                sx={{ width: 64, height: 64, bgcolor: "#E07B39", fontSize: "1.5rem", fontWeight: 700 }}
              >
                {profile?.full_name?.[0] ?? user.email?.[0]?.toUpperCase() ?? "U"}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  {params.locale === "hi" ? "नमस्ते" : "Welcome"},{" "}
                  {profile?.full_name ?? user.email?.split("@")[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              </Box>
            </Stack>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                {
                  label: "Membership Status",
                  labelHi: "सदस्यता स्थिति",
                  value: activeMembership ? planLabels[activeMembership.plan_code] ?? activeMembership.plan_code : "None",
                  icon: <CardMembershipIcon />,
                  color: activeMembership ? (planColors[activeMembership.plan_code] ?? "#E07B39") : "#757575",
                },
                {
                  label: "Total Donated",
                  labelHi: "कुल दान",
                  value: totalDonated > 0 ? `₹${totalDonated.toLocaleString("en-IN")}` : "₹0",
                  icon: <VolunteerActivismIcon />,
                  color: "#2D6A4F",
                },
              ].map(({ label, labelHi, value, icon, color }) => (
                <Grid item xs={12} sm={6} md={4} key={label}>
                  <Paper
                    elevation={0}
                    sx={{ p: 3, border: `1px solid ${color}25`, borderRadius: 2, borderLeft: `4px solid ${color}` }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ color, opacity: 0.8 }}>{icon}</Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">{label}</Typography>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", display: "block", color: "text.secondary", fontSize: "0.7rem" }}
                        >
                          {labelHi}
                        </Typography>
                        <Typography variant="h6" fontWeight={700} sx={{ color }}>{value}</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              ))}

              {activeMembership && (
                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      border: `1px solid ${planColors[activeMembership.plan_code] ?? "#E07B39"}25`,
                      borderRadius: 2,
                      borderLeft: `4px solid ${planColors[activeMembership.plan_code] ?? "#E07B39"}`,
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <VerifiedIcon sx={{ color: planColors[activeMembership.plan_code] ?? "#E07B39", opacity: 0.8 }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Member ID</Typography>
                        <Typography variant="body2" fontWeight={700} sx={{ fontFamily: "monospace" }}>
                          {activeMembership.public_member_id}
                        </Typography>
                        <Button
                          component={Link}
                          href={`/${params.locale}/verify/${activeMembership.public_member_id}`}
                          size="small"
                          variant="text"
                          sx={{ p: 0, fontSize: "0.72rem", color: planColors[activeMembership.plan_code] }}
                        >
                          View Digital ID →
                        </Button>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              )}
            </Grid>

            {/* Recent Donations */}
            {donations && donations.length > 0 && (
              <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                  Recent Donations / हालिया दान
                </Typography>
                <Stack spacing={1.5}>
                  {donations.map((d) => (
                    <Stack key={d.id} direction="row" justifyContent="space-between" alignItems="center"
                      sx={{ p: 1.5, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 1 }}>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{d.purpose}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(d.created_at).toLocaleDateString("en-IN")}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" fontWeight={700}>₹{d.amount.toLocaleString("en-IN")}</Typography>
                        <Chip
                          label={d.status}
                          size="small"
                          sx={{
                            bgcolor: d.status === "completed" ? "#2D6A4F20" : "#E07B3920",
                            color: d.status === "completed" ? "#2D6A4F" : "#E07B39",
                            fontWeight: 600,
                          }}
                        />
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            )}
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
