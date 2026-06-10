import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//@ts-ignore
import "./globals.css";
import FormularoDeEnvioADiscord from "@/components/FormularioDeCodigo";
import FormularioAntiBot from "@/components/FormularioAntiBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ola",
  description: "Buenosdias",
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

        <FormularioAntiBot />
        <div className="flex flex-col-reverse md:flex-row max-h-screen items-center justify-center font-sans text-black bg-background  border-b border-black">          {children}

        </div>
      </body>
    </html>
  );
}
