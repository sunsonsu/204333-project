import { Payload } from "@/interface/token";
import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET_KEY);

export async function generateToken(payload:Payload):Promise<string> {
    const token = await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).sign(secret);

    return token;
}

export async function validateToken(token:string):Promise<Payload | null> {
    try {
        const { payload } = await jwtVerify(token, secret);
        const new_payload = payload as Payload
        return new_payload;
    } catch (error) {
        return null;
    }
}