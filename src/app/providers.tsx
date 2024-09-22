"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";

import LoaderWrapper from "@/app/components/loader/loaderWrapper";
import Navbar from "@/app/components/navbar/navbar";
import Notification from "@/app/components/notification/notification";
import { store } from "@/redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    const ignoreNavbarPaths = ['/login', '/signup', '/resetpassword', '/verifyemail', '/404']

    return (
        <>
            <div className="background"></div>
            <Provider store={store}>
                {!ignoreNavbarPaths.includes(path) && <Navbar />}
                <LoaderWrapper />
                <Notification />
                <Toaster position="top-right" />
                {children}
            </Provider>
        </>
    );
}
