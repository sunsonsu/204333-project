"use client";
import { DataContext } from "@/context/data";
import axiosCustom from "@/lib/axios";
import React, { useContext } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

export default function Favorite() {
  const [data, setData] = useContext(DataContext);

  async function onUnfavorite(name: string) {
    const res = await axiosCustom.delete(`/api/favorite?c=${name}`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      setData((p) => {
        return p.map((d) => {
          if (d.name === name) {
            return {
              name: d.name,
              exchange_rate: d.exchange_rate,
              timestamp: d.timestamp,
            };
          }
          return d;
        });
      });
    }
  }

  return (
    <section className="w-full mt-8 p-4">
      <article className="max-w-screen-2xl w-full mx-auto">
        <h1 className="text-2xl font-semibold p-4 underline">Favorite List</h1>
        <ul className="w-full">
          {data
            .filter((d) => d.fav)
            .map((d) => (
              <li
                key={d.name}
                className="p-4 border-t flex gap-4 items-center border-gray-400 last-of-type:border-b"
              >
                <TiDelete
                  onClick={() => {
                    onUnfavorite(d.name);
                  }}
                  className="text-4xl cursor-pointer"
                />
                <b className="">{d.name}</b>
                <FaExchangeAlt />
                <p>{d.exchange_rate.toFixed(2)}$</p>
              </li>
            ))}
        </ul>
      </article>
    </section>
  );
}
