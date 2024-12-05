import { Poppins } from "next/font/google";
import React from "react";

import Providers from "@/app/providers";
import "./globals.css";

const poppins_init = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Rentify",
  description: "Rentify is a platform that eases property management for renters and owners alike.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins_init.className}>
        <div className="background"></div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
