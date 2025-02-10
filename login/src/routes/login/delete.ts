import { Request, Response } from "express";

export default async function (req:Request, res:Response) {
    req.session.destroy((err)=>{
        if (err) return res.status(500).json({ message: err });
        
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "success." });
    });
}