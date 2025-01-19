import catchError from "@/lib/error";
import prisma from ".";

export async function getFavorite(uid:number) {
    const query_result = prisma.favorite.findMany({
        where: { uid }
    });

    return await catchError(query_result);
}

export async function favorite(uid: number, coin: string):Promise<Error | null> {
    const upserting = prisma.favorite.upsert({
        where: { uid_c: { uid: uid, c: coin } },
        update: { deletedAt: null },
        create: {
            uid,
            c: coin
        }
    });

    const [_, err_update] = await catchError(upserting);
    return err_update;
}

export async function unfavorite(uid: number, coin: string):Promise<Error | null> {
    const update = prisma.favorite.update({
        where: { uid_c: { uid, c: coin } },
        data: { deletedAt: new Date() }
    });

    const [_, err_update] = await catchError(update);
    return err_update;
}