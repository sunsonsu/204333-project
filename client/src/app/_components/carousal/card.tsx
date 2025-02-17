import useFavorite from "@/hook/fav";
import useSignInRequire from "@/hook/signin";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Prop {
    index: number;
    name: string;
    rate: number;
    fav?: boolean;
    compare: string;
    compare_rate: number;
    favFunc: (c: string, s: boolean) => void;
}

export default function Card(prop: Prop) {
    const param = useSearchParams();
    const { replace } = useRouter();
    const { onFavorite, onUnfavorite } = useFavorite();
    const loginRequire = useSignInRequire();

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

    async function onClickFavorite() {
        const status = await onFavorite(prop.name);
        if (status === 200) {
            prop.favFunc(prop.name, true);
        } else loginRequire(true);
    }

    async function onClickUnfavorite() {
        const status = await onUnfavorite(prop.name);
        if (status === 200) {
            prop.favFunc(prop.name, false);
        } else loginRequire(true);
    }

    return (
        <div
            className="w-full h-full absolute p-2"
            style={{ transform: `translateX(${100 * prop.index}%)` }}
        >
            <div className="w-full h-full p-4 py-6 transition-transform hover:scale-[1.02] relative shadow-md rounded-md bg-blue-950/30 flex flex-col items-center">
                <Link
                    href={`/chat/${prop.name}`}
                    className="w-full h-full absolute top-0 left-0 z-10"
                ></Link>
                <h1 className="text-3xl font-bold text-white">{prop.name}</h1>
                <p className="text-xs text-gray-400">
                    compare with{" "}
                    <b>{prop.compare ? prop.compare.toUpperCase() : "USD"}</b>
                </p>
                <div className="flex-grow flex items-center justify-center">
                    <b className="text-3xl text-gray-400">
                        {Number(calRate(prop.compare_rate).toFixed(2))}
                    </b>
                </div>
                <div className="mt-4 z-20">
                    <button onClick={onClickFrom} className="b mr-2">
                        From
                    </button>
                    <button onClick={onClickTo}>To</button>
                </div>
                {prop.fav ? (
                    <FaHeart
                        onClick={onClickUnfavorite}
                        className="mt-4 text-white text-3xl cursor-pointer z-20 transition-transform hover:scale-105"
                    />
                ) : (
                    <FaRegHeart
                        onClick={onClickFavorite}
                        className="mt-4 text-white text-3xl cursor-pointer z-20 transition-transform hover:scale-105"
                    />
                )}
            </div>
        </div>
    );
}
