import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GsapProvider } from "@/components/providers/gsap-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ScrollToTopButton from "@/components/utils/scroll-to-top-button";

export const metadata: Metadata = {
  title: "Suprabha Electricals",
  description:
    "Top-tier electrical contractor for government projects in Karnataka, India.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-body antialiased bg-background")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <GsapProvider>
            <ScrollToTopButton />
            {children}
          </GsapProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
