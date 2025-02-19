import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

//for getting all chat data with sum of each coin
router.get("/api/chat", async (req, res) => {
    try {
        const chat = await prisma.chat.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        const return_value: { [key: string]: number } = {};
        for (let i = 0; i < chat.length; i++) {
            if (!(chat[i]['c'] in return_value)) {
                return_value[chat[i]['c']] = 1;
            }else{
                return_value[chat[i]['c']] += 1;
            }
        } 
  
        res.json(return_value);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching chat" });
    }
});
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

        const uchatID = await prisma.chat.findMany({
            where: {
              uid: req.session.user_id as number,
            },
            select: {
              cid: true
            },
          });
        
        res.json({ rate, chat: users,uchatID }); //returning the rate and chat data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching rate" });
    }
});

//for posting new comment to the specific chat
router.post("/api/chat/:curr", async (req, res) => {
    const curr = req.params.curr
    // console.log(req.body)
    const { msg } = req.body;

    try {
        // console.log(req.session.user_id)
        // console.log(msg)
        // console.log(curr)
        const comment = await prisma.chat.create({
            data: {
            uid: req.session.user_id as number, //change to req.session.user_id as number
            msg: msg as string,
            c: curr as string
            }
        });
        console.log(comment);
        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching rate" });
    }
});

router.delete("/api/chat/:curr/:cid", async (req, res) => {
    const curr = req.params.curr;
    const cid = parseInt(req.params.cid);

    try {
        const comment = await prisma.chat.delete({
            where: {
            cid: cid
            }
        });
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting rate" });
    }
});

export default router;