import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GeminiChatWidget from "@/components/gemini-chat-widget";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EkorNime Studio",
  description: "Menghidupkan Fantasi Ekor Anime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GeminiChatWidget />
      </body>
    </html>
  );
}
