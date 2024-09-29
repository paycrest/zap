import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "noblocks",
  description: "Crypto-to-fiat payments with no blocks.",
  publisher: "Paycrest",
  authors: [{ name: "Paycrest", url: "https://paycrest.io" }],
  metadataBase: new URL("https://paycrest.io"),
  openGraph: {
    title: "noblocks",
    description: "Crypto-to-fiat payments with no blocks.",
    url: "https://noblocks.xyz",
    siteName: "noblocks",
    images: [
      {
        url: "/images/og-image.png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "noblocks",
    description: "Crypto-to-fiat payments with no blocks.",
    creator: "@paycrest",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
