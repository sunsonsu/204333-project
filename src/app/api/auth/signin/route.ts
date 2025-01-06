import catchError from "@/lib/error";
import { Json } from "@/lib/response";
import { generateToken } from "@/lib/token";
import { login } from "@/model/user";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { object, z } from "zod";

const schema = z.object({
    email: z.string(),
    password: z.string()
})

export async function POST(req:NextRequest) {
    const [raw_body, err_body] = await catchError(req.json());
    if (err_body) return Json({ message: err_body }, 400);
    const parsed = schema.safeParse(raw_body);
    if (!parsed.success) return Json({ message: parsed.error }, 400);
    const body = parsed.data;

    const [uid, err_login] = await login(body.email, body.password);
    if (!err_login) {
        const [token, err_token] = await catchError(generateToken({ id: uid }));
        if (err_token) return Json({ message: err_login }, 500);

        const cookieStore = await cookies();
        const exp_time = new Date();
        exp_time.setHours(exp_time.getHours()+2);
        let options:Partial<ResponseCookie> = { expires: exp_time };
        if (process.env.NODE_ENV==="production") options = { ...object, httpOnly: true, sameSite: "lax", secure: true };
        cookieStore.set("token", token, options);
        
        return Json();
    }
    if (err_login.message==="NOT_REGISTER") return Json({ message: err_login.message }, 404);
    if (err_login.message==="NOT_MATCH") return Json({ message: err_login.message }, 401);
    return Json({ message: err_login }, 500);
}