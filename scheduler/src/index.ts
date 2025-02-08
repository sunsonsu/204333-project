import Express from "express";
import redis from "./lib/cache";
import GetAPI from "./lib/api";
import { schedule } from "node-cron";
import { updateRate } from "./model/exchange";

const app = Express();

const PORT = process.env.PORT || 3001;

app.get("/", async (req, res) => {
    res.send("Hello World.");
});

app.listen(PORT, async ()=>{
    await redis.connect();

    // run every 5 minutes
    schedule("*/5 * * * *", async () => {
        const [body, err_get_api] = await GetAPI();
        if (err_get_api) {
            console.error("Get API Error", err_get_api);
            return;
        }
        if (!body) {
            console.error("API body Wrong Format.");
            return;
        }

        const err_update_rate = await updateRate(body);
        if (err_update_rate) console.error("Update Error:", err_update_rate);
    });

    console.log(`Server is running on port ${PORT}.`);
});