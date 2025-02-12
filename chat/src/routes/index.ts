import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//for getting the specific chat data
router.get("/api/chat/:curr", async (req, res) => {
    const curr = req.params.curr
    // console.log(curr)
    try {
        const users = await prisma.exchangeRate.findUnique({
            where:{
                coin: curr
            }
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});

//for posting new comment to the specific chat
router.post("/api/chat/:curr", async (req, res) => {
    const curr = req.params.curr
    const { message } = req.body;
    try {
        const comment = await prisma.chat.create({
            data: {
            uid:req.session.user_id as number,
            msg: message as string,
            c: curr as string
            }
        });
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});

export default router;