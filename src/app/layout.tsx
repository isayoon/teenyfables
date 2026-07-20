import type { Metadata } from "next";
import { Geist, Geist_Mono, Lacquer } from "next/font/google";
import { Header } from "@/components/Header";
import en from "@/translations/en";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lacquer = Lacquer({
  variable: "--font-lacquer",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: en.meta.title,
    template: en.meta.titleTemplate,
  },
  description: en.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lacquer.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
