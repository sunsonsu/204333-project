"use client";

import { useHandler } from "@/hook/handle";
import { useLoader } from "@/hook/load";
import { useSession } from "@/hook/session";
import { SignInForm, SignInFormError } from "@/interface/auth/signin";
import { axiosLogin } from "@/lib/axios";
import { formParser } from "@/lib/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

export default function SignIn() {
    const [err, setErr] = useState<SignInFormError>({});
    const loader = useLoader();
    const { replace } = useRouter();
    const [auth, setAuth] = useSession();
    const handler = useHandler();

    function onLogin(e: SyntheticEvent) {
        e.preventDefault();
        const form = formParser<SignInForm>(e);

        login(form);
    }

    async function login(data: SignInForm) {
        try {
            loader(true);
            const response = await axiosLogin.patch("/", data, {
                withCredentials: true,
            });
            loader(false);
            switch (response.status) {
                case 200:
                    setAuth(true);
                    replace("/");
                    break;
                case 404:
                    setErr({
                        email: "This Email is not exist in our database.",
                    });
                    break;
                case 403:
                    setErr({ password: "Password's not match." });
                    break;
                default:
                    setErr({});
                    handler(response.status, JSON.stringify(response.data));
                    break;
            }
        } catch (error) {
            console.error(error);
            handler(500);
        }
    }

    return (
        <form
            onSubmit={onLogin}
            className="p-8 rounded-md border flex text-white flex-col items-center gap-8 border-gray-500 max-w-sm w-full"
        >
            <h1 className="text-4xl font-semibold">Sign In</h1>
            <div className="w-full">
                <input
                    type="text"
                    className="bg-background border-b border-gray-500 text-foreground outline-none w-full px-1"
                    placeholder="Email..."
                    name="email"
                />
                {err.email && (
                    <p className="text-red-600 w-full text-xs">{err.email}</p>
                )}
            </div>
            <div className="w-full">
                <input
                    type="password"
                    className="bg-background border-b border-gray-500 text-foreground outline-none w-full px-1"
                    placeholder="Password..."
                    name="password"
                />
                {err.password && (
                    <p className="text-red-600 w-full text-xs">
                        {err.password}
                    </p>
                )}
            </div>
            <button
                type="submit"
                className="border text-xl bg-black/0 font-semibold px-2 py-1 rounded-md hover:bg-white/5 hover:text-background"
            >
                Sign In
            </button>
            <div className="text-xs text-center">
                <div>
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/auth?mode=signup"
                        className="text-blue-500 font-normal underline hover:text-blue-600 hover:font-bold"
                    >
                        Sign Up
                    </Link>
                </div>
                <div className="text-xs">
                    Back to{" "}
                    <Link
                        href="/"
                        className="text-blue-500 font-normal underline hover:text-blue-600 hover:font-bold"
                    >
                        home page
                    </Link>
                    ?
                </div>
            </div>
        </form>
    );
}
