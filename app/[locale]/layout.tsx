import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/lib/theme";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let messages = {};

  try {
    messages = await getMessages();
  } catch (err) {
    // Fallback if getMessages fails (e.g., in static generation)
    try {
      messages = (await import(`@/messages/${locale}.json`)).default;
    } catch {
      messages = {};
    }
  }

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
