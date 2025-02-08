import catchError from "@/lib/error";
import { Json } from "@/lib/response";
import { register } from "@/model/user";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    cpassword: z.string()
})

export async function POST(req:NextRequest) {
    const [raw_body, err_body] = await catchError(req.json());
    if (err_body) return Json({ message: err_body }, 400);
    const parsed = schema.safeParse(raw_body);
    if (!parsed.success) return Json({ message: parsed.error }, 400);
    const body = parsed.data;

    if (body.cpassword!==body.password) return Json({ message: "CPASS_NOT_MATCH" }, 400);
    const err_register = await register(body.email, body.password, body.username);
    if (!err_register) return Json({ message: "SUCCESS" });
    if (err_register instanceof Prisma.PrismaClientKnownRequestError) {
        if (err_register.code==="P2002") return Json({ message: "EMAIL_ALREADY_EXIST" }, 409);
        return Json({ message: err_register.message }, 500);
    }
    return Json({ messaage: err_register }, 500);
}