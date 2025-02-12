import { Router } from "express";
import _delete from "./delete";
import patch from "./patch";
import post from "./post";
import get from "./get";

const login = Router();

login.post("/", post);
login.delete("/", _delete);
login.patch("/", patch);
login.get("/", get);

export default login;
