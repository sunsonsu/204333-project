import { Request, Response } from "express";
import { getFavorite } from "../../model/favorite";

export default async function(req:Request, res:Response) {
    if (req.session.user_id) {
        const [fav, err_fav] = await getFavorite(req.session.user_id);
        if (err_fav) {
            res.status(500).json({ message: err_fav });
            return;
        }

        if (!fav) {
            res.status(200).json({ message: "success.", data: [] });
            return;
        }

        res.status(200).json({ message: "success.", data: fav.favorite.map(f=>f.c)});
    } else res.status(200).json({ message: "success.", data: [] });
}