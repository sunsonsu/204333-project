import prisma from ".";
import catchError from "../lib/error";

export async function getAllExchangeRate() {
    const rates_promise = prisma.exchangeRate.findMany({});
    return await catchError(rates_promise);
}