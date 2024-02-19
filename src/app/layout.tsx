import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import Sidebar from "@/components/Sidebar/Sidebar";
import { inter } from "@/utils/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";
import Player from "./_components/player/Player";
import "./globals.scss";
import "./main.scss";

export const viewport: Viewport = {
  themeColor: "#151515",
};

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
      <Head>
        <meta name="theme-color" content="#151515" />
        <meta
          name="description"
          content="Listen to YouTube as audio on-the-go."
        />
        <link
          rel="manifest"
          href="./manifest.webmanifest"
        />
      </Head>
      <body className={`${inter.className}`}>
        <ErrorBoundary>
          <main className="main">
            <Sidebar />
            <StoreProvider>
              <div className="right-content">
                <div className="children">{children}</div>
                <Player />
              </div>
            </StoreProvider>
            <Toaster
              toastOptions={{
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
            <SpeedInsights />
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
