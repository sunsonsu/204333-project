"use client";
import { useLoader } from "@/hook/load";
import { useSession } from "@/hook/session";
import Coin from "@/interface/coin";
import { DefaultProp } from "@/interface/page";
import { axiosCoin } from "@/lib/axios";

import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";

// Type & Interface
interface CoinInterface {
    message: string;
    data: { [key: string]: number };
}

interface FavoriteInterface {
    message: string;
    data: string[];
}

// Context
export const DataContext = createContext<
    [Coin[], Dispatch<SetStateAction<Coin[]>>]
>([[], () => {}]);

export default function DataProvider(prop: DefaultProp) {
    const [data, setData] = useState<Coin[]>([]);
    const [auth, setAuth] = useSession();
    const load = useLoader();

    useEffect(() => {
        const fetchData = async () => {
            load(true);
            try {
                const fav: { [key: string]: boolean } = {};
                const res = await axiosCoin.get<FavoriteInterface>("/fav", {
                    withCredentials: true,
                });
                if (res.status === 200) {
                    const body = res.data.data;
                    body.forEach((d) => {
                        fav[d] = true;
                    });
                }
                if (res.status === 401) setAuth(() => false);

                const response = await axiosCoin.get<CoinInterface>("/coin");
                if (response.status === 200) {
                    const rates = response.data.data;
                    const coins_data = Object.keys(rates).map((key) => {
                        return {
                            name: key,
                            rate: rates[key],
                            fav: fav[key],
                        };
                    });
                    setData(coins_data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            load(false);
        };
        fetchData();
    }, []);
    return (
        <DataContext.Provider value={[data, setData]}>
            {prop.children}
        </DataContext.Provider>
    );
}
