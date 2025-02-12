import { Router } from "express";
import get from "./get";
import post from "./post";
import _delete from "./delete";

const fav = Router();

fav.get("/", get);
fav.post("/", post);
fav.delete("/", _delete);

export default fav;