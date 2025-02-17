"use client";
import { DataContext } from "@/context/data";
import React, { useContext, useEffect, useState } from "react";
import Card from "./card";
import Coin from "@/interface/coin";

export default function SearchCoin() {
    const [data, setData] = useContext(DataContext);
    const [show, setShow] = useState<Coin[]>([]);
    const [search, setSearch] = useState<string>("");
    const [isFav, setIsFav] = useState<boolean>(false);

    useEffect(() => {
        setShow(() => {
            return data.filter(
                (d) =>
                    d.name.includes(search.toUpperCase()) && (!isFav || d.fav)
            );
        });
    }, [search, data, isFav]);

    function onEditFav(coin: string, status: boolean) {
        setData((p) => {
            return p.map((r) => (r.name === coin ? { ...r, fav: status } : r));
        });
    }

    return (
        <section className="w-full mx-auto max-w-screen-xl p-4">
            <hr />
            <article className="flex gap-4 p-4 mt-4">
                <input
                    onChange={(e) => {
                        setSearch(() => e.target.value);
                    }}
                    type="text"
                    placeholder="Search Currency..."
                    className="flex-grow border-b border-white bg-black/0 outline-none text-white p-1 px-2 text-xl"
                />
                {isFav ? (
                    <button
                        onClick={() => {
                            setIsFav(false);
                        }}
                    >
                        Favorite Filter: On
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setIsFav(true);
                        }}
                    >
                        Favorite Filter: Off
                    </button>
                )}
            </article>
            <ul className="flex flex-col gap-4 p-4">
                {show.map((d) => (
                    <Card key={d.name} {...d} favFunc={onEditFav} />
                ))}
                {show.length === 0 && (
                    <li className="p-2 px-4 bg-blue-950/30 relative rounded-md flex justify-center">
                        <h1 className="text-xl text-white font-semibold">
                            Not Found this currency.
                        </h1>
                    </li>
                )}
            </ul>
        </section>
    );
}
