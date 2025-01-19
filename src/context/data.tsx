"use client";
import { FeedCardProp } from "@/interface/feedcard/prop";
import { DefaultProp } from "@/interface/page";
import axiosCustom from "@/lib/axios";
import axios from "axios";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

// Type & Interface
interface ResponseInterface {
  api_data: { [key: string]: { rate: number; updatedAt: Date } };
}

// Context
export const DataContext = createContext<
  [FeedCardProp[], Dispatch<SetStateAction<FeedCardProp[]>>]
>([[], () => {}]);

export default function DataProvider(prop: DefaultProp) {
  const [data, setData] = useState<FeedCardProp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fav: { [key: string]: boolean } = {};
        const res = await axiosCustom.get<{ data: { c: string }[] }>(
          "/api/favorite",
          { withCredentials: true }
        );
        if (res.status === 200) {
          const data = res.data.data;
          data.forEach((d) => {
            fav[d.c] = true;
          });
        }

        const response = await axios.get<ResponseInterface>("/api/currency");
        if (response.status === 200) {
          const rates = response.data.api_data;
          const feedCards = Object.keys(rates).map((key) => {
            return {
              name: key,
              exchange_rate: rates[key].rate,
              timestamp: new Date(rates[key].updatedAt).toLocaleString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }
              ),
            };
          });
          setData(
            feedCards.map((f) => {
              let new_f: FeedCardProp = { ...f };
              if (fav[f.exchange_rate]) {
                new_f.fav = true;
              }
              return new_f;
            })
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <DataContext.Provider value={[data, setData]}>
      {prop.children}
    </DataContext.Provider>
  );
}
