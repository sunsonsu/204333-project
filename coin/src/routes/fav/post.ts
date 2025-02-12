import { Request, Response } from "express";
import { string, z } from "zod";
import { onFavorite } from "../../model/favorite";

const schema = z.object({
    coin: z.string()
});

export default async function (req:Request, res:Response) {
    if (!req.session.user_id) {
        res.status(401).json({ message: "unauthen." });
        return;
    }

    const body = schema.safeParse(req.body);
    if (body.error) {
        res.status(400).json({ message: body.error });
        return;
    }

    const err = await onFavorite(req.session.user_id, body.data.coin);
    if (err) {
        console.log(err);
        res.status(500).json({ message: err });
        return;
    }
    res.status(200).json({ message: "success." });
}