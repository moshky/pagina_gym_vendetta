import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsAppFlotante";
import "./globals.css";
import WhatsAppFlotante from "@/components/WhatsAppFlotante";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vendetta Fitness",
  description: "Te va a doler, pero te va a gustar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${anton.variable} ${inter.variable} flex min-h-screen flex-col font-sans antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFlotante />
      </body>
    </html>
  );
}