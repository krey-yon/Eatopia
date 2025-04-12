"use server";

import { RestaurantFormSchema } from "@/lib/definitions";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { getCurrentSession } from "@/lib/cookie";

export const CreateRestaurant = async (
  values: z.infer<typeof RestaurantFormSchema>
) => {
  const { name, address } = values;
  const { user } = await getCurrentSession();
  const userId = user?.id;

  try {
    const restaurant = prisma.restaurant.create({
      data: {
        name,
        address,
        owner: {
          connect: { id: userId },
        },
      },
    });

    if (!restaurant) {
      return {
        message: "An error occurred while creating restaurant.",
      };
    }

    return {
      message: "Restaurant created successfully!",
    };
  } catch (error) {
    console.log(error);
  }
};
