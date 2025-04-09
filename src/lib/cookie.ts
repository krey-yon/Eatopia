import {cookies} from "next/headers";
import {validateSession} from "@/lib/session";

export async function setSessionCookies (token : string, expiresAt : Date) {
    const cookieStore = await cookies()
    cookieStore.set("session", token, {
        httpOnly : true,
        sameSite : "lax",
        secure : process.env.NODE_ENV === "production",
        expires : expiresAt,
        path : "/"
    })
}

export async function deleteSession () {
    const cookieStore = await cookies()
    cookieStore.set("session", "", {
        httpOnly : true,
        sameSite : "lax",
        secure : process.env.NODE_ENV === "production",
        maxAge : 0,
        path : "/"
    })
}

export async function getCurrentSession (){
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value ?? null;
    if (!token) {
        return {session : null, user : null}
    }
    const result = validateSession(token);
    return result;
}