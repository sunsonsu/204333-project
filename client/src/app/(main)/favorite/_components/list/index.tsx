"use client";
import { useAlert } from "@/hook/alert";
import { useHandler } from "@/hook/handle";
import { useLoader } from "@/hook/load";
import Favorite from "@/interface/favorite";
import { axiosCoin } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Card from "./card";

interface FavoriteResponse {
    message: string;
    data: Favorite[];
}

export default function FavoriteList() {
    const [favList, setFavList] = useState<Favorite[]>([]);
    const [show, setShow] = useState<Favorite[]>([]);
    const [search, setSearch] = useState<string>("");
    const load = useLoader();
    const alert = useAlert();
    const handle = useHandler();
    const { replace } = useRouter();

    useEffect(() => {
        getFav();
    }, []);

    async function getFav() {
        load(true);
        const res = await axiosCoin.get<FavoriteResponse>("/fav", {
            withCredentials: true,
        });
        load(false);
        if (res.status === 200) setFavList(res.data.data);
        else if (res.status === 401)
            alert({
                text: "Login Required. Please sign in or sign up to access this page.",
                cb: () => {
                    replace("/auth?mode=signin");
                },
            });
        else handle(res.status, JSON.stringify(res.data));
    }

    useEffect(() => {
        if (!search) setShow(() => favList);
        const to_search = search.toUpperCase();
        setShow(() => favList.filter((f) => f.c.includes(to_search)));
    }, [search, favList]);

    function unfavUpdate(coin: string) {
        setFavList((p) => p.filter((f) => f.c !== coin));
    }

    return (
        <section className="w-full max-w-screen-xl mx-auto">
            <article className="w-full p-4 text-end">
                <input
                    type="text"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    className="bg-black/0 border-b text-white p-1 px-2 outline-none"
                    placeholder="Search..."
                />
            </article>
            <ul className="flex flex-col gap-4 p-4">
                {show.length === 0 && (
                    <li className="bg-blue-950/50 p-6 rounded-md text-center text-white">
                        Not found your favorite currency.
                    </li>
                )}
                {show.map((f) => (
                    <Card key={f.c} updateFunction={unfavUpdate} data={f} />
                ))}
            </ul>
        </section>
    );
}
