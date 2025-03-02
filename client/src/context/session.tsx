"use client";
import { DefaultProp } from "@/interface/page";
import { axiosLogin } from "@/lib/axios";
import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";

type Context = [boolean, Dispatch<SetStateAction<boolean>>];

export const SessionContext = createContext<Context>([false, () => {}]);

export default function SessionProvider(prop: DefaultProp) {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        checkAuthen();
    }, []);

    async function checkAuthen() {
        const res = await axiosLogin.get("/", { withCredentials: true });
        if (res.status === 200) setAuth(() => true);
        else setAuth(() => false);
    }

    return (
        <SessionContext.Provider value={[auth, setAuth]}>
            {prop.children}
        </SessionContext.Provider>
    );
}
