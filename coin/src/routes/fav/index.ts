import { Router } from "express";
import get from "./get";

const fav = Router();

fav.get("/", get);

export default fav;