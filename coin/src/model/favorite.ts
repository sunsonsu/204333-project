import prisma from ".";
import catchError from "../lib/error";

export async function getFavorite(user_id: number) {
    const fav_promise = prisma.user.findFirst({
        where: { id: user_id },
        include: {
            favorite: true
        }
    });

    return await catchError(fav_promise);
}