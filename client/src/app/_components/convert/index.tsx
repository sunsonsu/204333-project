"use client";
import { numberOnly } from "@/lib/form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/data";
import { RiArrowUpDownFill } from "react-icons/ri";

export default function Convertor() {
    const [rate, setRate] = useContext(DataContext);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState(rate.length > 0 ? rate[0].name : "");
    const param = useSearchParams();
    const { replace } = useRouter();

    useEffect(() => {
        const p_from = param.get("from");
        const p_to = param.get("to");

        if (to === p_from || from === p_to) {
            const old_from = from;
            const old_to = to;
            setFrom(() => old_to);
            setTo(() => old_from);
            replace(`/?from=${old_to}&to=${old_from}`);
        } else {
            if (p_from) setFrom(() => p_from);
            if (p_to) setTo(() => p_to);
        }
    }, [param]);

    function onChangeSelect(from: string | null, to: string | null) {
        const p_from = param.get("from");
        const p_to = param.get("to");

        if (from) {
            if (p_to) replace(`/?from=${from}&to=${p_to}`);
            else replace(`/?from=${from}`);
        } else {
            if (p_from) replace(`/?from=${p_from}&to=${to}`);
            else replace(`/?to=${to}`);
        }
    }

    return (
        <section className="w-full text-white p-4 mx-auto max-w-screen-xl flex flex-col items-center">
            <div className="flex items-center w-fit">
                <label
                    htmlFor="from"
                    className="text-xl pb-[0.1rem] font-semibold mr-4"
                >
                    From
                </label>
                <select
                    value={from}
                    onChange={(e) => {
                        onChangeSelect(e.target.value, null);
                    }}
                    className="bg-black/0 border-b font-semibold text-xl"
                >
                    {rate.map((r) => (
                        <option key={r.name} value={r.name}>
                            {r.name}
                        </option>
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
            <div className="flex items-center  w-fit">
                <label
                    htmlFor="from"
                    className="text-xl pb-[0.1rem] font-semibold mr-4"
                >
                    To
                </label>
                <select
                    value={to}
                    onChange={(e) => {
                        onChangeSelect(null, e.target.value);
                    }}
                    className="bg-black/0 border-b font-semibold text-xl"
                >
                    {rate.map((r) => (
                        <option key={r.name} value={r.name}>
                            {r.name}
                        </option>
                    ))}
                </select>
            </div>
        </section>
    );
}
