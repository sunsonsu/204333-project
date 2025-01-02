import React from "react";
import SignIn from "./_components/signin";
import SignUp from "./_components/signup";

interface SearchPageProps {
  searchParams: Promise<{
    mode: "signup" | "signin" | undefined;
  }>;
}

export default async function page({ searchParams }: SearchPageProps) {
  const sr = await searchParams;
  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      {sr.mode === "signup" ? <SignUp /> : <SignIn />}
    </main>
  );
}
