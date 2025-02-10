import prisma from ".";
import catchError from "../lib/error";
import { hash } from "bcryptjs";

export async function getUser(email:string) {
    const user_promise = prisma.user.findFirst({ where: { email } });
    return await catchError(user_promise);
}

export interface CreateUser {
    email: string,
    password: string,
    username: string
}

export async function createUser(info:CreateUser) {
    const hashed_promise = hash(info.password, 10);
    const [hashed, err_hash] = await catchError(hashed_promise);
    if (err_hash) return err_hash;
    
    const user_promise = prisma.user.create({ data: {
        email: info.email,
        password: hashed,
        name: info.username
    }});

    const [_, err_user] = await catchError(user_promise);
    return err_user;
}

export async function updateLastLogin(email: string) {
    const user_promise = prisma.user.update({
        data: { lastLogin: new Date() },
        where: { email }
    });
    const [_, err_update] = await catchError(user_promise);
    return err_update;
}