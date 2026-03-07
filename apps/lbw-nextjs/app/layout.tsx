import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";

import { cn } from "@/lib/utils";
import { UserProvider } from "@/providers/user-provider";
import { PaymentProvider } from "@/providers/payment-provider";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import PlausibleProvider from "next-plausible";
import PostHog from "@/components/shared/post-hog";
import { AxiomWebVitals } from "next-axiom";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// TEST

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lay Back and Win",
  description: "Lay Back and Win Horse Racing AI partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-MTPJQC83" />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MTPJQC83"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AxiomWebVitals />
          <PlausibleProvider domain="laybackandwin.com.au">
            <PostHog>
              <UserProvider>
                <PaymentProvider>
                  <Analytics />
                  <GoogleAnalytics gaId="G-V3FDQH0S34" />
                  {children}
                </PaymentProvider>
              </UserProvider>
            </PostHog>
          </PlausibleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
