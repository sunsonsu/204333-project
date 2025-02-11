"use client";

import { useLoader } from "@/hook/load";
import { axiosLogin } from "@/lib/axios";
import React from "react";

export default function Logout() {
    const load = useLoader();

    async function onLogout() {
        load(true);
        const res = await axiosLogin.delete("/", {
            withCredentials: true,
        });
        load(false);
        if (res.status === 200) {
            window.location.reload();
        }
    }

    return (
        <li
            onClick={() => {
                onLogout();
            }}
            className="hover:text-yellow-400 transition duration-300 flex items-center justify-center cursor-pointer px-6"
        >
            Log Out
        </li>
    );
}
