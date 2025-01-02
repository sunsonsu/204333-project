import Link from "next/link";
import React from "react";

export default function SignIn() {
  return (
    <form className="p-8 rounded-md border flex flex-col items-center gap-8 border-gray-500 max-w-sm w-full">
      <h1 className="text-3xl font-semibold">Sign In</h1>
      <input
        type="text"
        className="bg-background border-b border-gray-500 text-white outline-none w-full px-1"
        placeholder="Email..."
        name="email"
      />
      <input
        type="password"
        className="bg-background border-b border-gray-500 text-white outline-none w-full px-1"
        placeholder="Password..."
        name="password"
      />
      <button className="border text-xl px-2 py-1 rounded-md hover:bg-white hover:text-black">
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
