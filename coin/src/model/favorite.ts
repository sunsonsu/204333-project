import prisma from ".";
import catchError from "../lib/error";

export async function getFavorite(user_id: number) {
    const fav_promise = prisma.user.findFirst({
        where: { id: user_id },
        include: {
            favorite: {
                include: {
                    coin: {
                        include: {
                            favorite: true
                        }
                    },
                }
            }
        }
    });

    return await catchError(fav_promise);
}

export async function onFavorite(uid:number, coin:string) {
    const create_promise = prisma.favorite.create({
        data: { uid, c: coin }
    });

    const [_, err_create] = await catchError(create_promise);
    return err_create;
}

export async function onUnfavorite(uid:number, coin:string) {
    const delete_promise = prisma.favorite.delete({ where: { uid_c: { uid, c: coin } } });
    const [_, err_delete] = await catchError(delete_promise);
    return err_delete;
}