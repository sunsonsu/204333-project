"use client";
import { useHandler } from "@/hook/handle";
import { useLoader } from "@/hook/load";
import { SignUpForm, SignUpFormErr } from "@/interface/auth/signout";
import { axiosLogin } from "@/lib/axios";
import { formParser } from "@/lib/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";

export default function SignUp() {
    const [err, setErr] = useState<SignUpFormErr>({});
    const loader = useLoader();
    const handler = useHandler();
    const { replace } = useRouter();

    function onSignUp(e: SyntheticEvent) {
        e.preventDefault();
        const form = formParser<SignUpForm>(e);
        signUp(form);
    }

    async function signUp(data: SignUpForm) {
        try {
            loader(true);
            const response = await axiosLogin.post<{ message: string }>(
                "/",
                data
            );
            loader(false);
            const body = response.data;
            switch (response.status) {
                case 200:
                    replace("/auth");
                case 409:
                    setErr({ email: "Email is already exist." });
                    break;
                case 406:
                    setErr({
                        cpassword: "Confirm password must match with password.",
                    });
                    break;
                default:
                    handler(response.status, JSON.stringify(body));
            }
        } catch (error) {
            loader(false);
            console.error(error);
        }
    }

    return (
        <form
            onSubmit={onSignUp}
            className="p-8 rounded-md border flex text-white flex-col items-center gap-8 border-gray-500 max-w-sm w-full"
        >
            <h1 className="text-3xl font-semibold">Sign Up</h1>
            <div className="w-full">
                <input
                    type="text"
                    className="bg-background border-b border-gray-500 text-foreground outline-none w-full px-1"
                    placeholder="Username..."
                    name="username"
                />
                {err.username && (
                    <p className="text-red-600 w-full text-xs">
                        {err.username}
                    </p>
                )}
            </div>
            <div className="w-full">
                <input
                    type="email"
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
            <div className="w-full">
                <input
                    type="password"
                    className="bg-background border-b border-gray-500 text-foreground outline-none w-full px-1"
                    placeholder="Confirm Password..."
                    name="confirm_password"
                />
                {err.cpassword && (
                    <p className="text-red-600 w-full text-xs">
                        {err.cpassword}
                    </p>
                )}
            </div>
            <button className="border text-xl bg-black/0 font-semibold px-2 py-1 rounded-md hover:bg-white/5 hover:text-background">
                Sign Up
            </button>
            <div className="text-xs text-center">
                <div>
                    Already have an account?{" "}
                    <Link
                        href="/auth?mode=signin"
                        className="text-blue-500 font-normal underline hover:text-blue-600 hover:font-bold"
                    >
                        Sign In
                    </Link>
                </div>
                <div>
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
