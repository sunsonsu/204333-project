import { Request, Response } from "express";

export default async function (req:Request, res:Response) {
    console.log(req.session.user_id);
    if (req.session.user_id) {
        res.status(200).json({ message: "have session." });
    } else {
        res.status(401).json({ message: "unauthen" });
    }
}