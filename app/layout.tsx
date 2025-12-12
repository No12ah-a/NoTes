import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoTes - AI-Powered Note Taking",
  description: "Modern, beautiful note-taking application with AI features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
