import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FormularoDeEnvioADiscord from "@/components/FormularioDeCodigo";

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

        <div className="flex flex-col-reverse md:flex-row max-h-screen items-center justify-center font-sans text-black bg-background  border-b border-black">
          <FormularoDeEnvioADiscord />
          {children}

        </div>
      </body>
    </html>
  );
}
