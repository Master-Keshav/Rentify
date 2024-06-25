"use client";

import { Poppins } from "next/font/google";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import LoaderWrapper from "@/app/components/loader/LoaderWrapper";
import NotificationWrapper from "@/app/components/notification/NotificationWrapper";

import "./globals.css";

const poppins_init = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={poppins_init.className}>
        <Provider store={store}>
          <Toaster position="top-right" />
          <LoaderWrapper />
          <NotificationWrapper />
          {children}
        </Provider>
      </body>
    </html>
  );
}
