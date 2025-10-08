import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Damru Campus Ambassador",
  description:
    "Join the Damru Campus Ambassador Program and be a part of an exciting journey to promote the Damru Fest at your college. As a campus ambassador, you'll have the opportunity to develop your leadership skills, gain valuable experience, and connect with like-minded individuals. Sign up now to become a key player in making the Damru Fest a memorable event on your campus!",
  icons: {
    icon: "/favicon/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
