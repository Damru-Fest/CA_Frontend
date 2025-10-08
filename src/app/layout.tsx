import type { Metadata } from "next"; 
import "./globals.css";

 
export const metadata: Metadata = {
  title: "Damru Campus Ambassador",
  description: "Join the Damru Campus Ambassador Program and be a part of an exciting journey to promote the Damru Fest at your college. As a campus ambassador, you'll have the opportunity to develop your leadership skills, gain valuable experience, and connect with like-minded individuals. Sign up now to become a key player in making the Damru Fest a memorable event on your campus!",
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
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
