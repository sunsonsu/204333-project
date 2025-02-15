"use client";
import { useAlert } from "@/hook/alert";
import { useConfirm } from "@/hook/confirm";
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
        setShow(() => favList.filter((f) => f.c.includes(search)));
    }, [search, favList]);

    return (
        <section className="w-full max-w-screen-xl mx-auto">
            <article className="w-full p-4 text-end">
                <input
                    type="text"
                    className="bg-black/0 border-b text-white p-1 px-2 outline-none"
                    placeholder="Search..."
                />
            </article>
            <article className="grid gap-4 p-4 xl:grid-cols-6">
                {show.length === 0 && (
                    <div className="col-span-10 text-center text-white">
                        Not found your favorite currency.
                    </div>
                )}
                {show.map((f) => (
                    <Card key={f.c} data={f} />
                ))}
            </article>
        </section>
    );
}
