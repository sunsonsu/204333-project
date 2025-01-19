import Link from "next/link";
import React from "react";
import Logout from "./logout";
import { cookies } from "next/headers";
import { validateToken } from "@/lib/token";

const Navbar: React.FC = async () => {
  const ck = await cookies();
  const token = ck.get("token");
  let isAuthened = true;
  if (!token) isAuthened = false;
  else {
    const payload = await validateToken(token.value);
    if (!payload) isAuthened = false;
  }

  return (
    <nav className="bg-dark-blue text-yellow-500 shadow-md py-3 px-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Brand */}
        <div className="text-2xl font-bold ml-2">Currency Exchange</div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li className="nav-item">
            <Link
              href="/"
              className="hover:text-yellow-300 transition duration-300"
            >
              Home
            </Link>
          </li>
          {isAuthened ? (
            <Logout />
          ) : (
            <li className="nav-item">
              <Link
                href="/auth"
                className="hover:text-yellow-300 transition duration-300"
              >
                SignIn
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-yellow-500 text-3xl cursor-pointer">
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
