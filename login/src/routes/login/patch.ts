import { Request, Response } from "express";
import { z } from "zod";
import { getUser, updateLastLogin } from "../../model/user";
import { compare } from "bcryptjs";
import catchError from "../../lib/error";

const schema = z.object({
    email: z.string(),
    password: z.string()
});

export default async function (req:Request, res:Response) {
    const body = schema.safeParse(req.body);
    if (body.error) {
        res.status(400).json({ message: body.error });
        return;
    }

    const [user, err_user] = await getUser(body.data.email);
    if (err_user) {
        res.status(500).json({ message: err_user });
        return;
    }
    if (!user) {
        res.status(404).json({ message: "user not found." });
        return;
    }

    const pass_promise = compare(body.data.password, user.password);
    const [pass, err_pass] = await catchError(pass_promise);
    if (err_pass) {
        res.status(500).json({ message: err_pass });
        return;
    }
    if (pass) {
        
        const err_update = await updateLastLogin(body.data.email);
        if (err_update) console.log("Update Last Login Error:", err_update);
        
        req.session.user_id = user.id;
        res.status(200).json({ message: "success." });
        return;
    }
    res.status(403).json({ message: "password's not match." });
}