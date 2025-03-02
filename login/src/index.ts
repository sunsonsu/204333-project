import "./config";
import Express from "express";
import redis from "./lib/cache";
import router from "./routes";
import Cors from "cors";
import session from "./lib/session";

const app = Express();

const PORT = process.env.PORT || 3001;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(session);

if (process.env.NODE_ENV !== "production") {
    app.use(Cors({ origin: ["http://localhost:3000"], credentials: true }));
}

app.use(process.env.BASE_PATH || "/", router);

app.listen(PORT, async ()=>{
    await redis.connect();
    console.log(`Server is running on port ${PORT}.`);
});