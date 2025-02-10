import Link from "next/link";
import React from "react";
import Logout from "./logout";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/token";

const Navbar: React.FC = async () => {
    const ck = await cookies();
    const token = ck.get("connect.sid");

    return (
        <nav className="text-white w-full">
            <div className="w-full max-w-screen-xl mx-auto flex items-stretch">
                {/* Brand */}
                <Link href={"/"}>
                    <p className="text-3xl font-bold ml-2 p-4">
                        Currency Exchange
                    </p>
                </Link>

                {/* Navigation Links */}
                <div className="flex-grow"></div>
                <ul className="hidden md:flex items-stretch text-[1.05rem] font-semibold">
                    <Link
                        href="/"
                        className="hover:text-yellow-400 transition duration-300 flex items-center justify-center"
                    >
                        <li className="nav-item px-6">Home</li>
                    </Link>
                    <Link
                        href="/comment"
                        className="hover:text-yellow-400 transition duration-300 flex items-center justify-center"
                    >
                        <li className="nav-item px-6">Comment</li>
                    </Link>
                    {token ? (
                        <Logout />
                    ) : (
                        <Link
                            href="/auth"
                            className="hover:text-yellow-400 transition duration-300 flex items-center justify-center"
                        >
                            <li className="nav-item px-6">Sign In</li>
                        </Link>
                    )}
                </ul>

                {/* Mobile Menu Icon */}
                <div className="md:hidden text-blue-700 text-3xl cursor-pointer">
                    ☰
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
