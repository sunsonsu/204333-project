import { exit } from "process";
import { createClient } from "redis";

const url = process.env.REDIS_URL || "redis://127.0.0.1:6379"
const redis = createClient({ url });

redis.on('error', err=>{
    console.log("Redis Error:", err);
    exit(1);
});

export default redis