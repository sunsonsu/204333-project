"use client";

import { useHandler } from "@/hook/handle";
import Favorite from "@/interface/favorite";
import { axiosCoin } from "@/lib/axios";
import { abbNumber } from "@/lib/general";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa";

interface Prop {
    data: Favorite;
    updateFunction: (coin: string) => void;
}

export default function Card(prop: Prop) {
    const handle = useHandler();

    async function onClickUnfavorite() {
        const res = await axiosCoin.delete(`/fav?coin=${prop.data.c}`, {
            withCredentials: true,
        });
        if (res.status === 200) prop.updateFunction(prop.data.c);
        else handle(res.status);
    }

    return (
        <div className="bg-blue-950/50 p-2 px-4 justify-between items-center rounded-md text-white relative transition-transform hover:scale-[1.01] flex">
            <Link
                href={`/chat/${prop.data.c}`}
                className="w-full h-full absolute top-0 left-0"
            ></Link>
            <div className="z-10">
                <h1 className="font-bold text-xl">{prop.data.c}</h1>
                <h2 className="text-xs text-gray-400 font-semibold">
                    {Number(prop.data.coin.rate.toFixed(2))} per $
                </h2>
            </div>
            <div className="flex items-center z-10 gap-4">
                <h2 className="text-gray-400 font-medium text-xl">
                    {abbNumber(prop.data.coin.favorite)}
                </h2>
                <FaHeart
                    onClick={onClickUnfavorite}
                    className="text-white text-3xl cursor-pointer z-20 transition-transform hover:scale-105"
                />
            </div>
        </div>
    );
}
