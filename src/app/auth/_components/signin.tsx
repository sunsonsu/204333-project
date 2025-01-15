'use client';

import Link from "next/link";
import React, { SyntheticEvent } from "react";

export default function SignIn() {

  function onLogin(e:SyntheticEvent) {
    e.preventDefault();
  }

  return (
    <form onSubmit={onLogin} className="p-8 rounded-md border flex flex-col items-center gap-8 border-gray-500 max-w-sm w-full">
      <h1 className="text-3xl font-semibold">Sign In</h1>
      <input
        type="text"
        className="bg-background border-b border-gray-500 text-foreground outline-none w-full px-1"
        placeholder="Email..."
        name="email"
      />
      <input
        type="password"
        className="bg-background border-b border-gray-500 text-foreground outline-none w-full px-1"
        placeholder="Password..."
        name="password"
      />
      <button type="submit" className="border text-xl px-2 py-1 rounded-md hover:bg-foreground hover:text-background">
        Sign In
      </button>
      <div className="text-xs">
        Don't have an account?{" "}
        <Link
          href="/auth?mode=signup"
          className="text-blue-500 font-normal underline hover:text-blue-600 hover:font-bold"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}
