import { Router } from "express";
import get from "./get";

const coin = Router();

coin.get("/", get);

export default coin;