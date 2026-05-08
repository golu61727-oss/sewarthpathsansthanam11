"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import { useLocale } from "next-intl";

const trustees = [
  {
    name: "Shri Mahesh Kumar Pandey",
    nameHi: "श्री महेश कुमार पाण्डेय",
    designation: "Founder & Chief Trustee",
    designationHi: "संस्थापक एवं प्रमुख न्यासी",
    location: "Varanasi, UP",
    initials: "MKP",
    primary: true,
  },
  {
    name: "Smt. Madhu Pandey",
    nameHi: "श्रीमती मधु पाण्डेय",
    designation: "Trustee Member",
    designationHi: "न्यासी सदस्य",
    location: "Varanasi, UP",
    initials: "MP",
  },
  {
    name: "Smt. Komal Devi",
    nameHi: "श्रीमती कोमल देवी",
    designation: "Trustee Member",
    designationHi: "न्यासी सदस्य",
    location: "Varanasi, UP",
    initials: "KD",
  },
  {
    name: "Shri Amarnath Pandey",
    nameHi: "श्री अमरनाथ पाण्डेय",
    designation: "Trustee Member",
    designationHi: "न्यासी सदस्य",
    location: "Varanasi, UP",
    initials: "AP",
  },
  {
    name: "Km. Priti Kumari",
    nameHi: "कु. प्रीति कुमारी",
    designation: "Trustee Member",
    designationHi: "न्यासी सदस्य",
    location: "Varanasi, UP",
    initials: "PK",
  },
];

export default function TrusteesSection() {
  const locale = useLocale();

  return (
    <Box sx={{ py: 8, bgcolor: "#FFF8F0" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
            {locale === "hi" ? "हमारा नेतृत्व" : "Our Leadership"}
          </Typography>
          <hr className="section-divider" style={{ margin: "12px auto 16px" }} />
          <Typography variant="subtitle1" color="text.secondary">
            {locale === "hi"
              ? "न्यास की स्थापना और संचालन करने वाले समर्पित न्यासी"
              : "Dedicated trustees who founded and guide the trust"}
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {trustees.map((trustee, i) => (
            <Grid item xs={12} sm={6} md={i === 0 ? 4 : 3} key={trustee.name}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  border: trustee.primary ? "2px solid #E07B39" : "1px solid",
                  borderColor: trustee.primary ? "#E07B39" : "grey.100",
                  position: "relative",
                }}
              >
                {trustee.primary && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: "linear-gradient(90deg, #E07B39, #C9920C)",
                    }}
                  />
                )}
                <CardContent sx={{ p: 3, pt: trustee.primary ? 3.5 : 3 }}>
                  <Stack alignItems="center" spacing={1.5}>
                    <Avatar
                      sx={{
                        width: trustee.primary ? 72 : 60,
                        height: trustee.primary ? 72 : 60,
                        bgcolor: trustee.primary ? "#E07B39" : "#2D6A4F",
                        fontSize: trustee.primary ? "1.4rem" : "1.2rem",
                        fontWeight: 700,
                      }}
                    >
                      {trustee.initials}
                    </Avatar>
                    <Box>
                      <Typography
                        variant={trustee.primary ? "h6" : "subtitle1"}
                        fontWeight={700}
                        sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", lineHeight: 1.3 }}
                      >
                        {locale === "hi" ? trustee.nameHi : trustee.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "primary.main", fontWeight: 600, display: "block", mt: 0.5 }}
                      >
                        {locale === "hi" ? trustee.designationHi : trustee.designation}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {trustee.location}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
