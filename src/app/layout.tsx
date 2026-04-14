import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://ati-pad.vercel.app'
  ),
  title: "ATI / Alphas Tool Interactive",
  description: "Estación de comando digital minimalista para centralizar tu ecosistema de IA y herramientas Web. Centraliza tu flujo de trabajo con arquitectura táctil.",
  openGraph: {
    title: "ATI / Alphas Tool Interactive",
    description: "Estación de comando digital minimalista para centralizar tu ecosistema de IA y herramientas Web.",
    url: "https://ati-pad.vercel.app",
    siteName: "ATI Dashboard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ATI - Alphas Tool Interactive Dashboard",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATI / Alphas Tool Interactive",
    description: "Estación de comando digital para centralizar tu ecosistema de IA.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} bg-base text-hi font-body min-h-screen flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
