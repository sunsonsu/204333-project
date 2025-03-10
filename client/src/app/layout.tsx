import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./button.css";
import UtilProvider from "@/context/util/combine";
import SessionProvider from "@/context/session";
import SignInProvider from "@/context/login";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Currency Xchange",
    description:
        "The Web Application for exchange currency rate that based by USD",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SessionProvider>
                    <UtilProvider>
                        <SignInProvider>{children}</SignInProvider>
                    </UtilProvider>
                </SessionProvider>
                <div className="bg fixed w-full h-screen top-0 left-0"></div>
            </body>
        </html>
    );
}
