import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Proveedores - Conecta con proveedores o clientes de toda Cuba.",
    template: "%s | Aurora",
  },
  description: "Proveedores - Conecta con proveedores o clientes de toda Cuba.",
  metadataBase: new URL("https://aurora-pink.vercel.app"),
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Proveedores",
    description:
      "Proveedores - Conecta con proveedores o clientes de toda Cuba.",
    url: "https://aurora-pink.vercel.app",
    siteName: "Proveedores",
    locale: "es_CU",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
