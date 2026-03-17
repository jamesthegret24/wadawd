import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roblox Birthday Updater",
  description: "Update your Roblox account birthday programmatically",
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
