import React from "react";
import SignIn from "./_components/signin";
import SignUp from "./_components/signup";
import { Metadata } from "next";

interface SearchPageProps {
    searchParams: Promise<{
        mode: "signup" | "signin" | undefined;
    }>;
}

export const metadata: Metadata = {
    title: "Sign In/Up | Currency Xchange",
};

export default async function page({ searchParams }: SearchPageProps) {
    const sr = await searchParams;
    return (
        <main className="w-full min-h-screen flex justify-center items-center p-4">
            {sr.mode === "signup" ? <SignUp /> : <SignIn />}
        </main>
    );
}
