import { Payload } from "@/interface/token";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET_KEY);

export async function generateToken(payload:Payload):Promise<string> {
    const token = await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).sign(secret);

    return token;
}
