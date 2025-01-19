"use client";

import { useLoader } from "@/hook/load";
import axiosCustom from "@/lib/axios";
import React from "react";

export default function Logout() {
  const load = useLoader();

  async function onLogout() {
    load(true);
    const res = await axiosCustom.get("/api/auth/signout", {
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
      className="nav-item cursor-pointer"
    >
      Log Out
    </li>
  );
}
