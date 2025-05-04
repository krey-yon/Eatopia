"use server";

import prisma from "../../../lib/db";
import { SignupFormSchema } from "../../../lib/definitions";
import { hash } from "bcrypt";
import { z } from "zod";

export async function signup(values: z.infer<typeof SignupFormSchema>) {
  //  console.log(values);
  const { password, name, email, role, address } = values;

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
