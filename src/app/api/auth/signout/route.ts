import catchError from "@/lib/error";
import { Json } from "@/lib/response";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
    const [cookieStore, err] = await catchError(cookies());
    if (err) return Json({message: err}, 400);
    cookieStore.delete("token");
    return Json();
}