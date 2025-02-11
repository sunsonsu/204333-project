"use client";
import { numberOnly } from "@/lib/form";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/data";
import { RiArrowUpDownFill } from "react-icons/ri";

export default function Convertor() {
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const param = useSearchParams();
    const [rate, setRate] = useContext(DataContext);

    useEffect(() => {}, [param]);

    return (
        <main className="w-full">
            <section className="w-full text-white p-4 mx-auto max-w-screen-xl">
                <div className="flex items-center">
                    <label
                        htmlFor="from"
                        className="text-xl pb-[0.1rem] font-semibold mr-4"
                    >
                        From
                    </label>
                    <select className="bg-black/0 border-b font-semibold text-xl">
                        {rate.map((r) => (
                            <option value={r.name}>{r.name}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="text"
                    className="outline-none bg-black/0 text-2xl border-b p-1 px-2 border-white focus:border-b-2"
                    onChange={numberOnly}
                    id="from"
                    placeholder="Number"
                />
                <RiArrowUpDownFill className="text-white my-4 text-4xl cursor-pointer hover:text-yellow-200 transition-all" />
                <div className="flex items-center">
                    <label
                        htmlFor="from"
                        className="text-xl pb-[0.1rem] font-semibold mr-4"
                    >
                        To
                    </label>
                    <select className="bg-black/0 border-b font-semibold text-xl">
                        {rate.map((r) => (
                            <option value={r.name}>{r.name}</option>
                        ))}
                    </select>
                </div>
            </section>
        </main>
    );
}
