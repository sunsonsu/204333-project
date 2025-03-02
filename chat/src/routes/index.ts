import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import redis from "../lib/cache";
import catchError from "../lib/error";

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
        const dict_curr: { [key: string]: number } = {};
        const allCoins = await prisma.exchangeRate.findMany({
            select: {
            coin: true
            }
        });

        // Initialize all coins with 0
        allCoins.forEach(coin => {
            dict_curr[coin.coin] = 0;
        });

        // Count occurrences of each coin in chat
        for (let i = 0; i < chat.length; i++) {
            if (!(chat[i]['c'] in dict_curr)) {
            dict_curr[chat[i]['c']] = 1;
            } else {
            dict_curr[chat[i]['c']] += 1;
            }
        }

        // Sort dict_curr by value in descending order
        let sortedDictCurr;
        if (req.query.order === 'asc') {
            sortedDictCurr = Object.entries(dict_curr)
            .sort(([a], [b]) => a.localeCompare(b))
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        } else {
            sortedDictCurr = Object.entries(dict_curr)
            .sort(([, a], [, b]) => b - a)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        }

        res.json(sortedDictCurr);

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
        const rates_promise = redis.get("rates");
        const [rates, err_rates] = await catchError(rates_promise);
        let rate;
        //if redis is not work use this
        if(!rates){
            rate = await prisma.exchangeRate.findUnique({
                where:{
                    coin: curr
                }
            });
            // console.log("From DB")
        }else{ //if redis is working use this
            rate = JSON.parse(rates)[curr];
                rate = {coin: curr, rate: rate};
            // console.log("From Redis")
        }
   
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
        console.log(req.session.user_id)
        // let uchatID;
        // if(req.session.user_id){
        //     const uchatID = await prisma.chat.findMany({
        //         where: {
        //           uid: req.session.user_id as number,
        //         },
        //         select: {
        //           cid: true
        //         },
        //       });
        // }else{
        //     const uchatID = [];
        // }
        const uchatID = await prisma.chat.findMany({
            where: {
              uid: req.session.user_id as number,
            },
            select: {
              cid: true
            },
          });
        const user_id = req.session.user_id ? req.session.user_id : "not authen";
        res.json({ rate, chat: users, uchatID, user_id }); //returning the rate and chat data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching rate" });
    }
});

//for posting new comment to the specific chat
router.post("/api/chat/:curr", async (req, res) => {
    const curr = (req.params.curr).toUpperCase();
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
        res.json({ message: "Comment posted successfully" });
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