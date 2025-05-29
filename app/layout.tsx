import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner"

import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Clean Energy Simulator | Simulador de Energia Limpa",
  description: "Simulador de Energia Limpa - Capacitando soluções de energia sustentável para um futuro melhor.",
  keywords: [
    "energia limpa",
    "simulador de energia",
    "energia renovável",
    "eficiência energética",
    "sustentabilidade",
    "energia solar",
    "energia eólica",
    "simulação de energia",
    "economia de energia",
    "redução de custos",
    "energia sustentável",
    "futuro verde",
    "tecnologia limpa",
  ],
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
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
