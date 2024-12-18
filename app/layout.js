

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalContext, GlobalProvider } from "@/context/GlobalContext";
import { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
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