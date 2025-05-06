"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";  // Import SessionProvider
import "./globals.css";
import ServiceWorkerInitializer from "./ServiceWorkerInitializer";
// import { AuthProvider } from './Providers';
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/android/android-launchericon-192-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        {/* Wrap with both SessionProvider and AuthProvider */}
        <div className="bg-gray-900 max-h-full overflow-hidden">
          <SessionProvider>
            <AppProvider>
              {children}
            </AppProvider>
          </SessionProvider>
          <ServiceWorkerInitializer /> {/* Include client-side logic */}
          {/* {children} */}
        </div>
        <Toaster />
      </body>
    </html>
  );
}