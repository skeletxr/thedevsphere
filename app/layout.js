import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalContext, GlobalProvider } from "@/context/GlobalContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TheDevSphere",
  description: "TheDevSphere",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalProvider>
          <Toaster position="top-right" />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
