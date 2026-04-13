import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import NavBar from "./components/HomeComponents/NavBar";
import Footer from "./components/Footer";
import AOSInit from "./components/AOSInit";

const sansFont = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Venkateshwara Fibreglass Products - FRP Manufacturing",
  description:
    "Leading manufacturer of FRP composites for Automobile, Defence and Engineering industries with precision and durability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AOSInit />
        <NavBar />
        {children}

        <Footer />
      </body>
    </html>
  );
}
