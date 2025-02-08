import prisma from ".";
import redis from "../lib/cache";
import catchError from "../lib/error";

export async function updateRate(rates:{ [key:string]: number }) {
    const tran_promise = prisma.$transaction(async (pm) => {
        for await (const coin of Object.keys(rates)) {
            const upsert_promise = pm.exchangeRate.upsert({
                update: { rate: rates[coin] },
                create: { coin, rate: rates[coin] },
                where: { coin }
            });

            const [_, err] = await catchError(upsert_promise);
            if (err) console.error(`Upsert Error [${coin}}]:`, err);
        }

        const [_, err] = await catchError(redis.set("rates", JSON.stringify(rates)));
        if (err) throw err
    });

    const [_, err] = await catchError(tran_promise);
    return err;
}