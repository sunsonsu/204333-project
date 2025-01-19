import { Json } from "@/lib/response";
import { getPayload } from "@/lib/token";
import { getFavorite } from "@/model/favorite";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
    const payload = await getPayload();
    if (!payload) return Json({ message: "NOT_SIGN_IN" }, 401);
    
    const [fav, err] = await getFavorite(payload.id);
    if (err) return Json({ message: err }, 500);

    return Json({ data: fav });
}