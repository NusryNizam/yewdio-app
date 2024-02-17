import Sidebar from "@/components/Sidebar/Sidebar";
import { inter } from "@/utils/fonts";
import type { Viewport } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";
import Player from "./_components/player/Player";
import "./globals.scss";
import "./main.scss";

// const APP_NAME = "Yewdio";
// const APP_DEFAULT_TITLE = "Yewdio";
// const APP_TITLE_TEMPLATE = "Yewdio";
// const APP_DESCRIPTION =
//   "Listen to YouTube as audio on-the-go";

// // export const metadata: Metadata = {
// //   applicationName: APP_NAME,
// //   title: {
// //     default: APP_DEFAULT_TITLE,
// //     template: APP_TITLE_TEMPLATE,
// //   },
// //   description: APP_DESCRIPTION,
// //   appleWebApp: {
// //     capable: true,
// //     statusBarStyle: "default",
// //     title: APP_DEFAULT_TITLE,
// //   },
// //   formatDetection: {
// //     telephone: false,
// //   },
// // };

export const viewport: Viewport = {
  themeColor: "#151515",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="../../public/app-icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="../../public/app-icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="../../public/app-icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="../../public/app-icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="../../public/app-icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="../../public/app-icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="../../public/app-icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="../../public/app-icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="../../public/app-icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="../../public/app-icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../../public/app-icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="../../public/app-icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../../public/app-icons/favicon-16x16.png"
        />
        <meta
          name="msapplication-TileColor"
          content="#ffffff"
        />
        <meta
          name="msapplication-TileImage"
          content="/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#151515" />
        <link rel="manifest" href="./manifest.webmanifest" />
      </Head>
      <body className={`${inter.className}`}>
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
        </main>
      </body>
    </html>
  );
}
