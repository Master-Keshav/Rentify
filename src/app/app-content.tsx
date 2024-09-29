"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { setLoading } from "@/redux/slices/loaderSlice";
import LoaderWrapper from "@/app/components/loader/loaderWrapper";
import Navbar from "@/components/navbar";
import Notification from "@/app/components/notification/notification";
import { Toaster } from "react-hot-toast";

export default function AppContent({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const path = usePathname();
    const ignoreNavbarPaths = ['/login', '/signup', '/resetpassword', '/verifyemail'];

    useEffect(() => {
        dispatch(setLoading(true));
    }, [dispatch]);

    return (
        <>
            {!ignoreNavbarPaths.includes(path) && <Navbar />}
            <LoaderWrapper />
            <Notification />
            <Toaster position="top-right" />
            {children}
        </>
    );
}
