import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//for getting the specific chat data
router.get("/api/chat/:curr", async (req, res) => {

    const curr = (req.params.curr).toLocaleUpperCase();
    try {
        //check for exchangeRate data in redis

        //if redis is not work use this
        const rate = await prisma.exchangeRate.findUnique({
            where:{
                coin: curr
            }
        });
        //finding all chat of the specific coin
        const chat = await prisma.chat.findMany({
            where:{
                c: curr
            },
            orderBy: {
                createdAt: 'desc' //sorting the chat by latest created date
            }
        })

        //finding username for each chat
        const users = await Promise.all(chat.map(async (message) => {
            const user = await prisma.user.findUnique({
            where: {
                id: message.uid
            }
            });
            return { ...message, username: user?.name };//returning the chat data with username
        }));
        res.json({ rate, chat: users }); //returning the rate and chat data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching rate" });
    }
});

//for posting new comment to the specific chat
router.post("/api/chat/:curr", async (req, res) => {
    const curr = req.params.curr
    // console.log(req.body)
    const { message, uid} = req.body;

    try {
        const comment = await prisma.chat.create({
            data: {
            uid: uid, //change to req.session.user_id as number
            msg: message as string,
            c: curr as string
            }
        });
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching rate" });
    }
});

export default router;