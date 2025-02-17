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

        const change_fav_to_num = fav.favorite.map(f=>{
            const new_f:any = { ...f };
            new_f.coin.favorite = new_f.coin.favorite.length;
            return new_f
        });

        res.status(200).json({ message: "success.", data: change_fav_to_num });
    } else {
        res.status(401).json({ message: "success.", data: [] });
    }
}