"use server"

import {FormState, SigninFormSchema} from "@/lib/definitions";
import {prisma} from "@/lib/db";
import {compare} from "bcrypt"
import {generateSessionToken, createSession} from "../../../lib/session"
import {setSessionCookies} from "../../../lib/cookie"

export const signin = async (state : FormState, formData : FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    const validateFields = SigninFormSchema.safeParse({
        email,
        password,
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    try {
        const existingUser = await prisma.user.findFirst({ where: { email } });

        if (!existingUser) {
            return {
                message: "User with this email doesn't exist",
            };
        }

        const isPasswordCorrect =  compare(password!, existingUser.password!)

        if (!isPasswordCorrect) {
            return {
                message : "Password is incorrect"
            }
        }

            const token = await generateSessionToken();
            await createSession(token, existingUser.id);
            const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
            await setSessionCookies(token, expiresAt);

        return  {
            message : "signin successful"
        }
    } catch (e) {
        console.log(e);
        return {
            message : "error signing in"
        }
    }
}