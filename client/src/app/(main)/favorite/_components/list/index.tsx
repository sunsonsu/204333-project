"use client";
import Favorite from "@/interface/favorite";
import { axiosCoin } from "@/lib/axios";
import React, { useEffect, useState } from "react";

export default function FavoriteList() {
    const [favList, setFavList] = useState<Favorite[]>([]);

    useEffect(() => {
        getFav();
    }, []);

    async function getFav() {
        const res = await axiosCoin.get("/fav", { withCredentials: true });
    }

    return <section className="w-full max-w-screen-xl mx-auto"></section>;
}
