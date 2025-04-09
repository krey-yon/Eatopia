"use server"

import {prisma} from "../../../lib/db"
import {ROLE, FormState,SignupFormSchema} from "../../../lib/definitions"
import {hash} from "bcrypt"

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();
    const address = formData.get("address")?.toString();
    const role = formData.get("role")?.toString() as ROLE;

    const validateFields = SignupFormSchema.safeParse({
        name,
        email,
        password,
        address,
        role,
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    try {
        const existingUser = await prisma.user.findFirst({ where: { email } });

        if (existingUser) {
            return {
                message: "User with this email already exists",
            };
        }

        const hashedPassword = await hash(password!, 10);

        const user = await prisma.user.create({
            data: {
                name: name!,
                email: email!,
                password: hashedPassword,
                address: address!,
                role,
            },
        });

        if (!user) {
            return {
                message: "An error occurred while creating your account.",
            };
        }

        return {
            message: "User created successfully!",
        };
    } catch (e) {
        console.error(e);
        return {
            message: "An error occurred while signing up.",
        };
    }
}
