import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "./providers";
import {
  CookieConsent,
  Disclaimer,
  Footer,
  LogoOutlineBg,
  Navbar,
} from "./components";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zap by Paycrest",
  description: "Crypto-to-fiat payments in a zap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-full min-w-full bg-white transition-colors dark:bg-neutral-900">
            <Navbar />
            <div className="relative z-10 mx-auto flex min-h-screen max-w-mobile flex-col items-center px-4 pt-28 transition-all">
              <main className="w-full flex-grow">{children}</main>
              <Footer />
            </div>
            <LogoOutlineBg />
          </div>

          <Disclaimer />
          <CookieConsent />

          <ToastContainer
            position="bottom-right"
            theme="dark"
            stacked
            pauseOnHover
            pauseOnFocusLoss
            draggable
            bodyClassName="font-sans"
          />
        </Providers>
      </body>
    </html>
  );
}
