import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

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


export default router;