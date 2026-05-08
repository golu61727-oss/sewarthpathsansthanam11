import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Box, Container, Grid, Typography, Card, CardContent, Stack, Chip } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import WomanIcon from "@mui/icons-material/Woman";
import ParkIcon from "@mui/icons-material/Park";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ElderlyIcon from "@mui/icons-material/Elderly";
import AccessibleIcon from "@mui/icons-material/Accessible";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import BuildIcon from "@mui/icons-material/Build";
import PsychologyIcon from "@mui/icons-material/Psychology";

const programs = [
  {
    icon: SchoolIcon,
    color: "#E07B39",
    titleEn: "Education & Children",
    titleHi: "शिक्षा एवं बाल विकास",
    descEn: "Gurukuls, Vedic schools, libraries, modern technical and vocational training for youth.",
    descHi: "गुरुकुल, वैदिक विद्यालय, पुस्तकालय, आधुनिक तकनीकी एवं व्यावसायिक प्रशिक्षण।",
    category: "Education",
  },
  {
    icon: HealthAndSafetyIcon,
    color: "#2D6A4F",
    titleEn: "Health & Medical",
    titleHi: "स्वास्थ्य एवं चिकित्सा",
    descEn: "Free health camps, dispensaries, Ayurveda, Yoga, and mental health support.",
    descHi: "निःशुल्क स्वास्थ्य शिविर, औषधालय, आयुर्वेद, योग एवं मानसिक स्वास्थ्य सहायता।",
    category: "Health",
  },
  {
    icon: WomanIcon,
    color: "#C9920C",
    titleEn: "Women Empowerment",
    titleHi: "महिला सशक्तिकरण",
    descEn: "Skill development, education, anti-dowry campaigns, and support for underprivileged women.",
    descHi: "कौशल विकास, शिक्षा, दहेज विरोधी अभियान एवं वंचित महिलाओं का समर्थन।",
    category: "Social Welfare",
  },
  {
    icon: ParkIcon,
    color: "#52B788",
    titleEn: "Environment Conservation",
    titleHi: "पर्यावरण संरक्षण",
    descEn: "Organic farming promotion, Gaushalas, tree plantation, and conservation.",
    descHi: "जैविक खेती प्रोत्साहन, गौशाला, वृक्षारोपण एवं पर्यावरण संरक्षण।",
    category: "Environment",
  },
  {
    icon: MusicNoteIcon,
    color: "#6B3A1F",
    titleEn: "Banaras Gharana Music",
    titleHi: "बनारस घराने का संगीत",
    descEn: "Preservation of the classical Banaras Gharana music tradition and Indian cultural heritage.",
    descHi: "शास्त्रीय बनारस घराने की संगीत परंपरा एवं भारतीय सांस्कृतिक विरासत का संरक्षण।",
    category: "Culture",
  },
  {
    icon: AutoStoriesIcon,
    color: "#E07B39",
    titleEn: "Sanatan Dharma",
    titleHi: "सनातन धर्म संरक्षण",
    descEn: "Preservation of Vedic traditions, scriptures, and Indian spiritual heritage.",
    descHi: "वैदिक परंपराओं, शास्त्रों एवं भारतीय आध्यात्मिक विरासत का संरक्षण।",
    category: "Culture",
  },
  {
    icon: AgricultureIcon,
    color: "#2D6A4F",
    titleEn: "Rural Development",
    titleHi: "ग्रामीण विकास",
    descEn: "Village-level economic and social development programs for rural communities.",
    descHi: "ग्रामीण समुदायों के लिए ग्राम स्तरीय आर्थिक एवं सामाजिक विकास कार्यक्रम।",
    category: "Development",
  },
  {
    icon: BuildIcon,
    color: "#C9920C",
    titleEn: "Skill Development",
    titleHi: "कौशल विकास",
    descEn: "Vocational training and skill programs to enhance employment opportunities.",
    descHi: "रोजगार के अवसर बढ़ाने के लिए व्यावसायिक प्रशिक्षण एवं कौशल कार्यक्रम।",
    category: "Education",
  },
  {
    icon: AccessibleIcon,
    color: "#6B3A1F",
    titleEn: "Disability Support",
    titleHi: "दिव्यांग सहायता",
    descEn: "Assistive devices, therapy, and inclusive education for persons with disabilities.",
    descHi: "दिव्यांगजनों के लिए सहायक उपकरण, चिकित्सा एवं समावेशी शिक्षा।",
    category: "Social Welfare",
  },
  {
    icon: ElderlyIcon,
    color: "#E07B39",
    titleEn: "Senior Citizens Care",
    titleHi: "वरिष्ठ नागरिक देखभाल",
    descEn: "Care programs, healthcare, and social support for elderly citizens.",
    descHi: "वृद्धजनों के लिए देखभाल कार्यक्रम, स्वास्थ्य सेवा एवं सामाजिक समर्थन।",
    category: "Social Welfare",
  },
  {
    icon: PsychologyIcon,
    color: "#2D6A4F",
    titleEn: "Mental Health",
    titleHi: "मानसिक स्वास्थ्य",
    descEn: "Counseling, awareness campaigns, and mental health support services.",
    descHi: "परामर्श, जागरूकता अभियान एवं मानसिक स्वास्थ्य सहायता सेवाएं।",
    category: "Health",
  },
  {
    icon: HandshakeIcon,
    color: "#C9920C",
    titleEn: "Minority Welfare",
    titleHi: "अल्पसंख्यक उत्थान",
    descEn: "Inclusive support programs for all religious and social minorities.",
    descHi: "सभी धार्मिक एवं सामाजिक अल्पसंख्यकों के लिए समावेशी सहायता कार्यक्रम।",
    category: "Social Welfare",
  },
];

const categoryColors: Record<string, string> = {
  Education: "#E07B39",
  Health: "#2D6A4F",
  "Social Welfare": "#6B3A1F",
  Environment: "#52B788",
  Culture: "#C9920C",
  Development: "#E07B39",
};

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main>
        <Box
          sx={{
            py: 10,
            background: "linear-gradient(135deg, #3D1A0A 0%, #2D6A4F 100%)",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", color: "#E07B39", fontWeight: 700, mb: 1 }}
            >
              हमारे कार्यक्रम
            </Typography>
            <Typography variant="h4" sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 400, mb: 2 }}>
              Our Programs & Projects
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.65)", maxWidth: 500, mx: "auto" }}>
              Working across multiple domains to serve all communities in India
            </Typography>
          </Container>
        </Box>

        <Box sx={{ py: 8, bgcolor: "#FFFBF5" }}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {programs.map((program, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Card
                    sx={{
                      height: "100%",
                      transition: "all 0.25s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 8px 32px ${program.color}22`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Box
                            sx={{
                              width: 52,
                              height: 52,
                              borderRadius: 2,
                              bgcolor: `${program.color}18`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <program.icon sx={{ color: program.color, fontSize: 28 }} />
                          </Box>
                          <Chip
                            label={program.category}
                            size="small"
                            sx={{
                              bgcolor: `${categoryColors[program.category]}18`,
                              color: categoryColors[program.category],
                              fontWeight: 600,
                              fontSize: "0.7rem",
                            }}
                          />
                        </Stack>
                        <Box>
                          <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                            {program.titleEn}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: program.color,
                              fontFamily: "'Noto Sans Devanagari', sans-serif",
                              mt: 0.25,
                            }}
                          >
                            {program.titleHi}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          {program.descEn}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            fontFamily: "'Noto Sans Devanagari', sans-serif",
                            lineHeight: 1.6,
                            display: "block",
                          }}
                        >
                          {program.descHi}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
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
