"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import LoaderWrapper from "@/app/components/loader/LoaderWrapper";
import Navbar from "@/app/components/navbar/navbar";
import NotificationWrapper from "@/app/components/notification/NotificationWrapper";
import { store } from "@/redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="background"></div>
            <Provider store={store}>
                <Navbar />
                <Toaster position="top-right" />
                <LoaderWrapper />
                <NotificationWrapper />
                {children}
            </Provider>
        </>
    );
}
