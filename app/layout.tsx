import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/app/ui/components/navbar";
import ProfileCard from "@/app/ui/components/profileCard";
import { Metadata } from "next";
import CanvasAnimation from "./ui/anim/CanvasAnim";

export const metadata: Metadata = {
  title: {
    template: "%s | Debjeet's Portfolio",
    default: "Debjeet's Portfolio",
  },
  description: 'The official portfolio of debjeet',
  metadataBase: new URL('https://debjeet-portfolio.vercel.app'),
}

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative h-screen `}
      >

        <CanvasAnimation  />
        <div className="py-8">
        <ProfileCard />
        {children}
        <Navbar />
        </div>
      </body>
    </html>
  );
}
