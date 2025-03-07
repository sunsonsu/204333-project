"use client";
import Link from "next/link";
import React, { useState } from "react";
import Logout from "./logout";
import { useSession } from "@/hook/session";

const Navbar: React.FC = () => {
    const [auth] = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="text-white w-full">
            <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between p-4">
                {/* Brand */}
                <Link href="/">
                    <p className="text-3xl font-bold">Currency Xchange</p>
                </Link>

                {/* Mobile Menu Icon */}
                <div 
                    className="md:hidden text-blue-700 text-3xl cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "✖" : "☰"}
                </div>

                {/* Navigation Links */}
                <ul className="hidden md:flex items-center text-[1.05rem] font-semibold">
                    <Link href="/" className="hover:text-yellow-400 transition duration-300 px-6">
                        <li>Home</li>
                    </Link>
                    <Link href="/favorite" className="hover:text-yellow-400 transition duration-300 px-6">
                        <li>Favorite</li>
                    </Link>
                    <Link href="/chat" className="hover:text-yellow-400 transition duration-300 px-6">
                        <li>Comment</li>
                    </Link>
                    {auth ? (
                        <Logout />
                    ) : (
                        <Link href="/auth" className="hover:text-yellow-400 transition duration-300 px-6">
                            <li>Sign In</li>
                        </Link>
                    )}
                </ul>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden flex flex-col items-center bg-gray-900 text-white text-lg font-semibold py-4 space-y-4">
                    <Link href="/" className="hover:text-yellow-400" onClick={() => setIsOpen(false)}>
                        <li>Home</li>
                    </Link>
                    <Link href="/favorite" className="hover:text-yellow-400" onClick={() => setIsOpen(false)}>
                        <li>Favorite</li>
                    </Link>
                    <Link href="/chat" className="hover:text-yellow-400" onClick={() => setIsOpen(false)}>
                        <li>Comment</li>
                    </Link>
                    {auth ? (
                        <Logout />
                    ) : (
                        <Link href="/auth" className="hover:text-yellow-400" onClick={() => setIsOpen(false)}>
                            <li>Sign In</li>
                        </Link>
                    )}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
