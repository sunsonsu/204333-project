import Link from "next/link";
import React from "react";
import Logout from "./logout";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/token";

const Navbar: React.FC = async () => {
    const ck = await cookies();
    const token = ck.get("connect.sid");

    return (
        <nav className=" text-blue-700 shadow-md py-3 px-6">
            <div className="flex p-1 ">
                {/* Brand */}
                <p className="text-2xl font-bold ml-2 ">Currency Exchange</p>

                {/* Navigation Links */}
                <div className="flex-grow"></div>
                <ul className="hidden md:flex space-x-6">
                    <li className="nav-item">
                        <Link
                            href="/"
                            className="hover:text-yellow-400 transition duration-300"
                        >
                            Home
                        </Link>
                    </li>
                    {token ? (
                        <Logout />
                    ) : (
                        <li className="nav-item">
                            <Link
                                href="/auth"
                                className="hover:text-yellow-400 transition duration-300"
                            >
                                Sign In
                            </Link>
                        </li>
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
