import { Router } from "express";
import coin from "./coin";
import fav from "./fav";

const router = Router();

router.use("/coin", coin);
router.use("/fav", fav);

export default router;