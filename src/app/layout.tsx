import type { Metadata } from "next";
import "./globals.scss";
import "./main.scss";
import { inter } from "@/utils/fonts";
import Sidebar from "@/components/Sidebar/Sidebar";
import Player from "./_components/player/Player";

export const metadata: Metadata = {
  title: "Yewdio",
  description: "Listen to YouTube as audio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="main">
          <Sidebar />
          <div className="right-content">
            <div className="children">{children}</div>
            <Player />
          </div>
        </main>
      </body>
    </html>
  );
}
