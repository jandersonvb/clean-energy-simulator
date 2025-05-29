import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner"

import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Desafio Scoder "
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-gray-50 text-gray-900 antialiased ${poppins.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
