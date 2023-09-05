import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hellofresh Search",
  description: "Search for Hellofresh Recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
