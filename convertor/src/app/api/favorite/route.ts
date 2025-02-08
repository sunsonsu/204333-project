import { Json } from "@/lib/response";
import { getPayload } from "@/lib/token";
import { favorite, getFavorite, unfavorite } from "@/model/favorite";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET() {
    const payload = await getPayload();
    if (!payload) return Json({ message: "NOT_SIGN_IN" }, 401);
    
    const [fav, err] = await getFavorite(payload.id);
    if (err) return Json({ message: err }, 500);

    return Json({ data: fav });
}

const schema = z.object({ c: z.string() });

export async function POST(req:NextRequest) {
    const payload = await getPayload();
    if (!payload) return Json({ message: "NOT_SIGN_IN" }, 401);
    
    const raw_body = await req.json();
    const parsed = schema.safeParse(raw_body);
    if (!parsed.success) return Json({ message: "INVALID_ARG" }, 400);
    const body = parsed.data;

    const err = await favorite(payload.id, body.c);
    if (err) return Json({ message: err }, 500);

    return Json({ message: "SUCCESS" });
}

export async function DELETE(req:NextRequest) {
    const payload = await getPayload();
    if (!payload) return Json({ message: "NOT_SIGN_IN" }, 401);

    const sp = req.nextUrl.searchParams;
    const coin = sp.get("c");
    if (!coin) return Json({ message: "NOT_FOUND" }, 404);
    const err = await unfavorite(payload.id, coin);
    if (err) return Json({ message: err }, 500);
    return Json({});
}