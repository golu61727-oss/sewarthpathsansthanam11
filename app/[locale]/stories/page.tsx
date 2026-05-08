import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Box, Container, Grid, Typography, Card, CardContent, Avatar, Stack, Chip } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const stories = [
  {
    name: "Priya Sharma",
    nameHi: "प्रिया शर्मा",
    village: "Sarnath, Varanasi",
    category: "Education",
    quote: "The scholarship from Sewarth Path changed my life. I am now studying computer science at BHU and want to give back to my community.",
    quoteHi: "सेवार्थ पथ की छात्रवृत्ति ने मेरी जिंदगी बदल दी। मैं अब BHU में कंप्यूटर साइंस पढ़ रही हूं।",
    color: "#1565C0",
  },
  {
    name: "Ramesh Yadav",
    nameHi: "रमेश यादव",
    village: "Ramnagar, Varanasi",
    category: "Healthcare",
    quote: "The free health camp detected my diabetes early. The doctors and volunteers treated us with such care and dignity.",
    quoteHi: "नि:शुल्क स्वास्थ्य शिविर में मेरी मधुमेह का पता लगा। स्वयंसेवकों ने बहुत देखभाल की।",
    color: "#C62828",
  },
  {
    name: "Sunita Devi",
    nameHi: "सुनीता देवी",
    village: "Chandauli District",
    category: "Women",
    quote: "After the self-help group training, I started my own pickle and papad business. My children go to a private school now.",
    quoteHi: "स्वयं सहायता समूह की ट्रेनिंग के बाद मैंने अपना अचार-पापड़ व्यवसाय शुरू किया।",
    color: "#AD1457",
  },
  {
    name: "Arjun Kumar",
    nameHi: "अर्जुन कुमार",
    village: "Mirzapur",
    category: "Skill Development",
    quote: "I learned carpentry through the vocational training program. Now I run my own furniture workshop with 3 employees.",
    quoteHi: "व्यावसायिक प्रशिक्षण से मैंने बढ़ईगिरी सीखी। अब मेरी खुद की फर्नीचर वर्कशॉप है।",
    color: "#E07B39",
  },
  {
    name: "Meera Pathak",
    nameHi: "मीरा पाठक",
    village: "Varanasi City",
    category: "Culture",
    quote: "The music program at Sewarth Path preserved our classical traditions. My daughter is now a professional Sitar player.",
    quoteHi: "संगीत कार्यक्रम ने हमारी शास्त्रीय परंपराओं को बचाया। मेरी बेटी अब सितार वादक है।",
    color: "#6B3A1F",
  },
  {
    name: "Mohammad Rafi",
    nameHi: "मोहम्मद राफी",
    village: "Banaras",
    category: "Community",
    quote: "During the flood relief of 2024, Sewarth Path volunteers were the first to reach our neighborhood with food and medicine.",
    quoteHi: "2024 की बाढ़ में सेवार्थ पथ के स्वयंसेवक सबसे पहले हमारे मोहल्ले में पहुंचे।",
    color: "#2D6A4F",
  },
];

const categoryColors: Record<string, string> = {
  Education: "#1565C0",
  Healthcare: "#C62828",
  Women: "#AD1457",
  "Skill Development": "#E07B39",
  Culture: "#6B3A1F",
  Community: "#2D6A4F",
};

export default function StoriesPage() {
  return (
    <>
      <Navbar />
      <main>
        <Box
          sx={{
            py: 10,
            background: "linear-gradient(135deg, #3D1A0A 0%, #C9920C 100%)",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "#FFFBF5", fontWeight: 700, mb: 1 }}
            >
              प्रभाव की कहानियां
            </Typography>
            <Typography variant="h4" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 400, mb: 2 }}>
              Impact Stories
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)" }}>
              Real lives transformed — वास्तविक जीवन बदलाव की कहानियां
            </Typography>
          </Container>
        </Box>

        <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {stories.map((story) => {
                const color = categoryColors[story.category] || "#E07B39";
                return (
                  <Grid item xs={12} md={6} key={story.name}>
                    <Card
                      sx={{
                        height: "100%",
                        border: `1px solid ${color}25`,
                        transition: "transform 0.2s",
                        "&:hover": { transform: "translateY(-4px)", boxShadow: `0 8px 32px ${color}20` },
                      }}
                    >
                      <Box sx={{ height: 4, bgcolor: color }} />
                      <CardContent sx={{ p: 3 }}>
                        <Stack spacing={2}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{ bgcolor: `${color}20`, color, width: 52, height: 52, fontSize: "1.25rem", fontWeight: 700 }}>
                              {story.name[0]}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={700}>{story.name}</Typography>
                              <Typography
                                variant="caption"
                                sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color, display: "block" }}
                              >
                                {story.nameHi}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">{story.village}</Typography>
                            </Box>
                            <Chip
                              label={story.category}
                              size="small"
                              sx={{ ml: "auto", bgcolor: `${color}15`, color, fontWeight: 600 }}
                            />
                          </Stack>

                          <Box sx={{ position: "relative", pl: 3 }}>
                            <FormatQuoteIcon
                              sx={{ position: "absolute", left: -4, top: -4, fontSize: 28, color: `${color}50` }}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                              {story.quote}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              p: 1.5,
                              bgcolor: `${color}08`,
                              borderRadius: 1,
                              borderLeft: `3px solid ${color}`,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: 1.6, display: "block" }}
                            >
                              {story.quoteHi}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
