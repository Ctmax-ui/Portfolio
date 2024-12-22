import localFont from "next/font/local";
import { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    template: "%s | Debjeet's Portfolio",
    default: "Debjeet's Portfolio",
  },
  description: "The official portfolio of debjeet",
  metadataBase: new URL("https://debjeet-portfolio.vercel.app"),
};

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-[dark]`}
      >
          {children}
      </body>
    </html>
  );
}
