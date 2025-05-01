import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    url: siteConfig.ogUrl,
    type: siteConfig.ogType as "website",
    images: [
      {
        url: siteConfig.ogImage.url,
        height: siteConfig.ogImage.height,
        width: siteConfig.ogImage.width,
      },
    ],
  },

  authors: {
    name: siteConfig.name,
    url: siteConfig.url,
  },
  metadataBase: new URL(siteConfig.url),
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
