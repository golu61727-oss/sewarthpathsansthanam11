"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  useMediaQuery,
  useTheme,
  Stack,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { key: "home", href: `/${locale}` },
    { key: "about", href: `/${locale}/about` },
    { key: "programs", href: `/${locale}/programs` },
    { key: "events", href: `/${locale}/events` },
    { key: "stories", href: `/${locale}/stories` },
    { key: "contact", href: `/${locale}/contact` },
  ];

  const toggleLocale = () => {
    const newLocale = locale === "hi" ? "en" : "hi";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "rgba(255, 251, 245, 0.97)",
          backdropFilter: "blur(8px)",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: { xs: 64, md: 72 } }}>
          {/* Logo */}
          <Link href={`/${locale}`} style={{ textDecoration: "none", color: "inherit" }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #E07B39, #C9920C)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <FavoriteIcon sx={{ color: "#fff", fontSize: 22 }} />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontWeight: 700, color: "primary.main", lineHeight: 1.2, fontSize: "0.85rem" }}
                >
                  सेवार्थ पथ संस्थानम्
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", lineHeight: 1.1, fontSize: "0.7rem" }}
                >
                  Sewarth Path Sansthanam
                </Typography>
              </Box>
            </Stack>
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              {navLinks.map(({ key, href }) => (
                <Button
                  key={key}
                  component={Link}
                  href={href}
                  size="small"
                  sx={{
                    color: pathname === href ? "primary.main" : "text.primary",
                    fontWeight: pathname === href ? 700 : 400,
                    fontSize: "0.85rem",
                  }}
                >
                  {t(key)}
                </Button>
              ))}
            </Stack>
          )}

          {/* Right actions */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={locale === "hi" ? "EN" : "हिं"}
              onClick={toggleLocale}
              size="small"
              sx={{
                cursor: "pointer",
                bgcolor: "primary.main",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.75rem",
                height: 28,
              }}
            />
            {!isMobile && (
              <>
                <Button
                  component={Link}
                  href={`/${locale}/volunteer`}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  sx={{ fontSize: "0.8rem" }}
                >
                  {t("volunteer")}
                </Button>
                <Button
                  component={Link}
                  href={`/${locale}/donate`}
                  variant="contained"
                  size="small"
                  color="primary"
                  sx={{ fontSize: "0.8rem" }}
                >
                  {t("donateNow")}
                </Button>
              </>
            )}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, bgcolor: "background.default" } }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1" fontWeight={700} color="primary">
            सेवार्थ पथ संस्थानम्
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {navLinks.map(({ key, href }) => (
            <ListItem key={key} disablePadding>
              <ListItemButton
                component={Link}
                href={href}
                onClick={() => setDrawerOpen(false)}
                selected={pathname === href}
              >
                <ListItemText primary={t(key)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Button
            component={Link}
            href={`/${locale}/membership`}
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => setDrawerOpen(false)}
          >
            {t("membership")}
          </Button>
          <Button
            component={Link}
            href={`/${locale}/volunteer`}
            variant="outlined"
            fullWidth
            onClick={() => setDrawerOpen(false)}
          >
            {t("volunteer")}
          </Button>
          <Button
            component={Link}
            href={`/${locale}/donate`}
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setDrawerOpen(false)}
          >
            {t("donateNow")}
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
