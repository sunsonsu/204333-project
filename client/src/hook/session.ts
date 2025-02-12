'use client';
import { SessionContext } from "@/context/session"
import { Dispatch, SetStateAction, useContext } from "react"


export function useSession():[boolean, Dispatch<SetStateAction<boolean>>] {
    const [auth, setAuth] = useContext(SessionContext);
    
    return [auth, setAuth]
}