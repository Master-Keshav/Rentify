"use client";

import React from "react";
import { Provider } from "react-redux";

import AppContent from "@/app/app-content";
import { store } from "@/redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Provider store={store}>
                <AppContent>{children}</AppContent>
            </Provider>
        </>
    );
}
