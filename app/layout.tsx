import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import NavBar from "./components/HomeComponents/NavBar";
import Footer from "./components/Footer";
import AOSInit from "./components/AOSInit";

/* ── Display / Hero font: Poppins (close match to Canva Sans) */
const displayFont = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

/* ── Utility / Nav / Button font: Inter */
const utilityFont = Inter({
  variable: "--font-utility",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
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
      className={`${displayFont.variable} ${utilityFont.variable} h-full antialiased`}
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
