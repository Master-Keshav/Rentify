import type { Metadata } from "next";
import RootLayout from "./layout";

export const metadata: Metadata = {
    title: "Rentify",
    description: "Rentify",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function ServerLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <RootLayout>{children}</RootLayout>
        </html>
    );
}