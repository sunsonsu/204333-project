import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Prop {
    index: number;
    name: string;
    rate: number;
    fav?: boolean;
    compare: string;
    compare_rate: number;
}

export default function Card(prop: Prop) {
    const param = useSearchParams();
    const { replace } = useRouter();

    function onClickFrom() {
        const to = param.get("to");
        if (to) {
            if (to === prop.name) replace(`/?from=${prop.name}`);
            else replace(`/?from=${prop.name}&to=${to}`);
        } else replace(`/?from=${prop.name}`);
    }

    function onClickTo() {
        const from = param.get("from");
        if (from) {
            if (from === prop.name) replace(`/?to=${prop.name}`);
            else replace(`/?from=${from}&to=${prop.name}`);
        } else replace(`/?to=${prop.name}`);
    }

    function calRate(cp_rate: number) {
        const result = prop.rate / cp_rate;
        return result;
    }

    return (
        <div
            className="w-full h-full absolute p-2"
            style={{ transform: `translateX(${100 * prop.index}%)` }}
        >
            <div className="w-full h-full p-4 py-6 relative shadow-md rounded-md bg-white flex flex-col items-center">
                <Link
                    href={`/coin/${prop.name}`}
                    className="w-full h-full absolute top-0 left-0 z-10"
                ></Link>
                <h1 className="text-3xl font-bold">{prop.name}</h1>
                <p className="text-xs text-gray-500">
                    compare with{" "}
                    <b>{prop.compare ? prop.compare.toUpperCase() : "USD"}</b>
                </p>
                <div className="flex-grow">
                    <b>{calRate(prop.compare_rate).toFixed(2)}</b>
                </div>
                <div className="mt-4 z-20">
                    <button onClick={onClickFrom} className="b mr-2">
                        From
                    </button>
                    <button onClick={onClickTo}>To</button>
                </div>
                {prop.fav ? (
                    <FaHeart className="mt-4 text-3xl cursor-pointer z-20 transition-transform hover:scale-105" />
                ) : (
                    <FaRegHeart className="mt-4 text-3xl cursor-pointer z-20 transition-transform hover:scale-105" />
                )}
            </div>
        </div>
    );
}
