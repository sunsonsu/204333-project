'use client';
import { axiosCoin } from "@/lib/axios";
import { useCallback } from "react";

export default function useFavorite() {
    const onFavorite = useCallback(async (coin:string)=>{
        const response = await axiosCoin.post("/fav", { coin }, { withCredentials: true });
        return response.status;
    }, []);

    const onUnfavorite = useCallback(async (coin:string)=>{
        const response = await axiosCoin.delete(`/fav?coin=${coin}`, { withCredentials: true });
        return response.status;
    }, []);

    return { onFavorite, onUnfavorite }
}