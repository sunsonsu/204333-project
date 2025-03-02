import { Request, Response } from "express";
import redis from "../../lib/cache";
import catchError from "../../lib/error";
import { getAllExchangeRate } from "../../model/exchange";
import { hostname } from "os"

export default async function(req:Request, res:Response) {
    const rates_promise = redis.get("rates");
    const [rates, err_rates] = await catchError(rates_promise);
    if (err_rates) {
        res.status(500).json({ message: err_rates });
        return;
    }

    // check for cache
    if (!rates) {
        const [db_rates, err_db_rates] = await getAllExchangeRate();
        if (err_db_rates) {
            res.status(500).json({ message: err_db_rates });
            return;
        }
        
        const exchange_rates:{ [key:string]: number } = {};
        db_rates.forEach(r=>exchange_rates[r.coin] = r.rate);
        
        res.status(200).json({ message: "success.", data: db_rates, host: hostname() });
        
        // cache manager
        const cache_promise = redis.set("rates", JSON.stringify(exchange_rates));
        const [_, err_cache] = await catchError(cache_promise);
        if (err_cache) console.error("Set Cache Error:", err_cache);
    } else {
        const exchange_rates = JSON.parse(rates);
        res.status(200).json({ message: "success.", data: exchange_rates, host: hostname() });
    }
}