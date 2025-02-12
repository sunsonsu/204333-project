"use client";
import { DefaultProp } from "@/interface/page";
import Link from "next/link";
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useState,
} from "react";

export const SignInContext = createContext<Dispatch<SetStateAction<boolean>>>(
    () => {}
);

export default function SignInProvider(prop: DefaultProp) {
    const [activate, setActivate] = useState<boolean>(false);

    return (
        <SignInContext.Provider value={setActivate}>
            {activate && (
                <div className="w-full h-screen fixed top-0 left-0 z-50 p-4 bg-black/50 flex items-center justify-center">
                    <div className="w-full max-w-md bg-white p-8 rounded-md flex flex-col gap-4">
                        <h1 className="text-center text-4xl font-bold mb-8">
                            Sign In Require!
                        </h1>
                        <Link
                            onClick={() => {
                                setActivate(() => false);
                            }}
                            href="/auth?mode=signin"
                        >
                            <button className="bl w-full border-4 border-black text-xl">
                                Go to Sign In
                            </button>
                        </Link>
                        <Link
                            onClick={() => {
                                setActivate(() => false);
                            }}
                            href="/auth?mode=signup"
                        >
                            <button className="border-4 w-full border-black text-xl">
                                Go to Sign Up
                            </button>
                        </Link>
                        <button
                            onClick={() => {
                                setActivate(() => false);
                            }}
                            className="border-4 w-full border-black text-xl"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {prop.children}
        </SignInContext.Provider>
    );
}
