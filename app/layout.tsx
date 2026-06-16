import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Space_Mono } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import NavBar from "./components/HomeComponents/NavBar";
import Footer from "./components/Footer";
import AOSInit from "./components/AOSInit";

const sansFont = Barlow({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const condFont = Barlow_Condensed({
  variable: "--font-cond",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const monoFont = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "VENKATESHWARA FIBREGLASS PRODUCTS - FRP Manufacturing",
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
      className={`${sansFont.variable} ${condFont.variable} ${monoFont.variable} h-full antialiased`}
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

