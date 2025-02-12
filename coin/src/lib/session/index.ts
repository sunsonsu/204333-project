import session from "express-session";
import redis from "../cache";
import { RedisStore } from "connect-redis";

const redisStore = new RedisStore({
    client: redis,
    prefix: "myapp:"
})

const sessionMiddleware = session({
    store: redisStore,
    secret: process.env.SECRET_KEY || "",
    resave: true,
    saveUninitialized: true,
})

export default sessionMiddleware;