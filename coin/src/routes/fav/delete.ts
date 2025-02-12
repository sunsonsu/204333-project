import { Request, Response } from "express";
import { onUnfavorite } from "../../model/favorite";

export default async function (req:Request, res:Response) {
    if (!req.session.user_id) {
        res.status(401).json({ message: "unauthen" });
        return;
    }

    const { coin } = req.query;

    if (!coin || typeof coin !== "string") {
        res.status(404).json({ message: "not found." });
        return;
    } 

    const err = await onUnfavorite(req.session.user_id, coin);
    if (err) {
        res.status(500).json({ message: err });
        return;
    }
    res.status(200).json({ message: "success." });
}