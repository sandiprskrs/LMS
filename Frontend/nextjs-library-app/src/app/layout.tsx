import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const merriweather = Merriweather({ weight: ['300', '400', '700', '900'], subsets: ["latin"], variable: '--font-serif' });

export const metadata: Metadata = {
  title: "LMS.Edu - Library System",
  description: "Modern Educational Library Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
