"use client";

import { useLoader } from "@/hook/load";
import axiosCustom from "@/lib/axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function Logout() {
  const load = useLoader();
  const { refresh } = useRouter();

  async function onLogout() {
    load(true);
    const res = await axiosCustom.get("/api/auth/signout", {
      withCredentials: true,
    });
    load(false);
    if (res.status === 200) {
      refresh();
    }
  }

  return (
    <li
      onClick={() => {
        onLogout();
      }}
      className="nav-item cursor-pointer"
    >
      Logout
    </li>
  );
}
