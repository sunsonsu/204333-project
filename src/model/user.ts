import catchError from "@/lib/error";
import prisma from ".";
import { compare, hash } from "bcryptjs";

export async function register(email:string, password:string, name:string):Promise<Error | null> {
    const [hashed, err] = await catchError(hash(password, 10));
    if (err) return err;
    
    const pm = prisma.user.create({
        data: {
            email,
            password: hashed,
            name
        }
    });

    const [_, err_create] = await catchError(pm);
    return err_create;
}

export async function login(email:string, password:string):Promise<Error | null> {
    const p_uinfo = prisma.user.findFirst({where: { email }});
    const [uinfo, err_find] = await catchError(p_uinfo);
    if (err_find) return err_find;
    if (!uinfo) return new Error("NOT_REGISTER");
    
    const [pass, err_compare] = await catchError(compare(password, uinfo.password));
    if (err_compare) return err_compare;
    if (!pass) return new Error("NOT_MATCH");

    const p_update = prisma.user.update({
        where: { email },
        data: { lastLogin: new Date() }
    });
    const [_, err_update] = await catchError(p_update);
    return err_update;
}