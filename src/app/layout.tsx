import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Practice Server",
  description: "Practice your SQL skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex h-[104px] border-spacing-2 items-center justify-between p-4 ">
          <Link
            href="/"
            className="text-2xl font-extrabold opacity-80 transition-all hover:ml-4 hover:opacity-100"
          >
            Übungsserver
          </Link>
          <div className="flex items-center gap-4">
            <Link className="font-bold" href="/testarea">
              Testarea
            </Link>
            <div className="h-6 w-[0.5px] rounded-full bg-slate-200" />
            <Link className="font-bold" href="/">
              Zu den Aufgaben
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
