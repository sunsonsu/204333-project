import { NextResponse } from "next/server";

export async function Json(body:unknown={ message: "SUCCESS" }, status:number=200) {
    return NextResponse.json(body, { status });
}