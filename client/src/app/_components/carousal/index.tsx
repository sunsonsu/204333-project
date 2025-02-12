"use client";
import { DataContext } from "@/context/data";
import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "./card";
import { useSearchParams } from "next/navigation";

interface Compare {
    name: string;
    rate: number;
}

const DEFAULT_COMPARE: Compare = {
    name: "USD",
    rate: 1,
};

export default function Carousal() {
    const [data, setData] = useContext(DataContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [compare, setCompare] = useState<Compare>({ name: "usd", rate: 1 });
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const params = useSearchParams();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex((c) =>
                data.length === 0 ? 0 : (c + 1) % data.length
            );
        }, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [data]);

    useEffect(() => {
        const from = params.get("from");

        const new_from = data.find((d) => d.name === from);
        if (!new_from) setCompare(() => DEFAULT_COMPARE);
        else {
            setCompare(() => {
                return { name: new_from.name, rate: new_from.rate };
            });
        }
    }, [params]);

    function onEditFav(coin: string, status: boolean) {
        setData((p) => {
            return p.map((r) => (r.name === coin ? { ...r, fav: status } : r));
        });
    }

    return (
        <section className="w-full relative min-h-80 max-w-screen-xl mx-auto p-4">
            <hr className="my-4" />
            <div className="w-full overflow-hidden">
                <div
                    className="w-1/5 max-xl:w-1/4 max-lg:w-1/3 max-md:w-1/2 max-sm:w-full h-80 top-0 relative transition-all"
                    style={{ transform: `translateX(${currentIndex * -100}%)` }}
                >
                    {data.map((d, index) => (
                        <Card
                            favFunc={onEditFav}
                            key={d.name}
                            index={index}
                            {...d}
                            compare={compare.name}
                            compare_rate={compare.rate}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
