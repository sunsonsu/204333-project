import axios from "axios";

export const axiosLogin = axios.create({
    validateStatus: ()=>true,
    baseURL: process.env.NEXT_PUBLIC_LOGIN_BASE_URL
});

export const axiosCoin = axios.create({
    validateStatus: ()=>true,
    baseURL: process.env.NEXT_PUBLIC_COIN_BASE_URL
});

export const axiosChat = axios.create({
    validateStatus: ()=>true,
    baseURL: process.env.NEXT_PUBLIC_CHAT_BASE_URL
});