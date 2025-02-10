import { Request, Response } from "express";
import { z } from "zod";
import { createUser } from "../../model/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const schema = z.object({
    email: z.string(),
    password: z.string(),
    confirm_password: z.string(),
    username: z.string()
});

export default async function(req:Request, res:Response) {
    const body = schema.safeParse(req.body);
    if (body.error) {
        res.status(400).json({ message: body.error });
        return;
    }

    if (body.data.password!==body.data.confirm_password) {
        res.status(406).json({ message: "confirm password's not match." });
        return;
    }

    const err_create = await createUser({
        email: body.data.email,
        password: body.data.password,
        username: body.data.username
    });

    if (err_create) {
        if (err_create instanceof PrismaClientKnownRequestError) {
            res.status(409).json({ message: "conflict user." });
            return;
        }
        res.status(500).json({ message: err_create });
        return;
    }
    res.status(200).json({ message: "success." });
}