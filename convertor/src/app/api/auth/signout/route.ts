import catchError from "@/lib/error";
import { Json } from "@/lib/response";
import { cookies } from "next/headers";

export async function GET() {
    const [cookieStore, err] = await catchError(cookies());
    if (err) return Json({message: err}, 400);
    cookieStore.delete("token");
    return Json();
}