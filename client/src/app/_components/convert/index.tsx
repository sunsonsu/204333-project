"use client";
import { numberOnly } from "@/lib/form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/data";
import { RiArrowUpDownFill } from "react-icons/ri";
import { isNumber } from "@/lib/general";
import Link from "next/link";

export default function Convertor() {
    const [rate, setRate] = useContext(DataContext);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState(rate.length > 0 ? rate[0].name : "");
    const param = useSearchParams();
    const { replace } = useRouter();
    const [fromInput, setFromInput] = useState<string>("");

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

    useEffect(() => {
        setTo((p) => (p === "" ? (rate.length > 0 ? rate[0].name : "") : p));
    }, [rate]);

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

    function calTo(_in: string, _to: string, _from: string) {
        const num = isNumber(_in) ? Number(_in) : 0;
        const to_info = rate.find((r) => r.name === _to);
        const from_info = rate.find((r) => r.name === _from);
        if (!to_info || !from_info) return 0;
        return (to_info.rate / from_info.rate) * num;
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
                    className="bg-black/0 text-center border-b-2 font-semibold text-xl"
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
                className="outline-none text-yellow-300 bg-black/0 text-center text-3xl my-4 border-b p-1 px-2 border-white focus:border-b-2"
                onChange={(e) => {
                    numberOnly(e);
                    setFromInput(e.target.value);
                }}
                id="from"
                placeholder="Number"
            />
            <Link href={`/?from=${to}&to=${from}`}>
                <RiArrowUpDownFill className="text-white my-4 text-4xl cursor-pointer hover:text-yellow-200 transition-all" />
            </Link>
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
                    className="bg-black/0 text-center border-b-2 font-semibold text-xl"
                >
                    {rate.map((r) => (
                        <option key={r.name} value={r.name}>
                            {r.name}
                        </option>
                    ))}
                </select>
            </div>
            <p className="mt-4 text-5xl font-bold text-green-500">
                {Number(calTo(fromInput, to, from).toFixed(2))}
            </p>
        </section>
    );
}
