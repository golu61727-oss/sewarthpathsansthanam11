import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Box, Container, Grid, Typography, Card, CardContent, Chip, Stack, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const upcomingEvents = [
  {
    title: "वृक्षारोपण महोत्सव",
    titleEn: "Tree Plantation Drive",
    date: "2026-06-05",
    location: "Sarnath, Varanasi",
    category: "Environment",
    desc: "On World Environment Day, join us to plant 1000 saplings across Sarnath.",
  },
  {
    title: "निःशुल्क स्वास्थ्य शिविर",
    titleEn: "Free Health Camp",
    date: "2026-06-15",
    location: "Banaras Hindu University Area",
    category: "Healthcare",
    desc: "Free medical check-ups, blood tests, and consultations for underprivileged communities.",
  },
  {
    title: "महिला सशक्तिकरण कार्यशाला",
    titleEn: "Women Empowerment Workshop",
    date: "2026-07-01",
    location: "Sewarth Path Center, Varanasi",
    category: "Women",
    desc: "Skill development and self-reliance workshop for women from rural areas.",
  },
];

const pastEvents = [
  {
    title: "शिक्षा जागरूकता रैली",
    titleEn: "Education Awareness Rally",
    date: "2025-11-14",
    location: "Varanasi City",
    category: "Education",
    desc: "Children's Day rally raising awareness about the importance of education.",
  },
  {
    title: "दीपोत्सव सेवा कार्यक्रम",
    titleEn: "Deepotsav Service Program",
    date: "2025-10-20",
    location: "Dashashwamedh Ghat",
    category: "Culture",
    desc: "Served 500+ devotees and cleaned the ghats during Diwali celebrations.",
  },
  {
    title: "वार्षिक स्वयंसेवक सम्मान समारोह",
    titleEn: "Annual Volunteer Recognition Ceremony",
    date: "2025-09-08",
    location: "Town Hall, Varanasi",
    category: "Community",
    desc: "Recognized 100+ exceptional volunteers with certificates and awards.",
  },
];

const categoryColors: Record<string, string> = {
  Environment: "#2D6A4F",
  Healthcare: "#C62828",
  Women: "#AD1457",
  Education: "#1565C0",
  Culture: "#E07B39",
  Community: "#6B3A1F",
};

function EventCard({ event, past }: { event: typeof upcomingEvents[0]; past?: boolean }) {
  const date = new Date(event.date);
  const formatted = date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const color = categoryColors[event.category] || "#E07B39";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${color}30`,
        opacity: past ? 0.8 : 1,
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: `0 8px 32px ${color}20` },
      }}
    >
      <Box sx={{ height: 4, bgcolor: color }} />
      <CardContent sx={{ flex: 1, p: 2.5 }}>
        <Stack spacing={1.5}>
          <Chip label={event.category} size="small" sx={{ bgcolor: `${color}15`, color, fontWeight: 700, alignSelf: "flex-start" }} />
          <Typography variant="h6" fontWeight={700} sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: 1.3 }}>
            {event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
            {event.titleEn}
          </Typography>
          <Typography variant="body2" color="text.secondary">{event.desc}</Typography>
          <Stack spacing={0.75}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarMonthIcon sx={{ fontSize: 16, color }} />
              <Typography variant="caption" fontWeight={600}>{formatted}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon sx={{ fontSize: 16, color }} />
              <Typography variant="caption" color="text.secondary">{event.location}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
      {!past && (
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            sx={{ borderColor: color, color, "&:hover": { bgcolor: `${color}10` } }}
          >
            Register Interest
          </Button>
        </Box>
      )}
    </Card>
  );
}

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <Box
          sx={{
            py: 10,
            background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "#52B788", fontWeight: 700, mb: 1 }}
            >
              कार्यक्रम
            </Typography>
            <Typography variant="h4" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 400, mb: 2 }}>
              Events
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)" }}>
              हमारे साथ जुड़ें — Participate in our community events
            </Typography>
          </Container>
        </Box>

        <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
          <Container maxWidth="lg">
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Upcoming Events / आगामी कार्यक्रम
            </Typography>
            <hr className="section-divider" style={{ margin: "12px 0 32px" }} />
            <Grid container spacing={3} sx={{ mb: 8 }}>
              {upcomingEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.titleEn}>
                  <EventCard event={event} />
                </Grid>
              ))}
            </Grid>

            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              Past Events / पिछले कार्यक्रम
            </Typography>
            <hr className="section-divider" style={{ margin: "12px 0 32px" }} />
            <Grid container spacing={3}>
              {pastEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.titleEn}>
                  <EventCard event={event} past />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
