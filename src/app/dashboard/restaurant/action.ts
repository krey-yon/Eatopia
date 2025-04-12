"use server";

import { RestaurantFormSchema } from "@/lib/definitions";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { getCurrentSession } from "@/lib/cookie";
import { revalidatePath } from "next/cache";


export const CreateRestaurant = async (
  values: z.infer<typeof RestaurantFormSchema>
) => {
  const { name, address } = values;
  console.log(name, address)
  const { user } = await getCurrentSession();
  const userId = user?.id;
  console.log(userId)

  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        address,
        ownerId: userId!
      },
    });
    if (!restaurant) {
      return {
        message: "An error occurred while creating restaurant.",
      };
    }
    // redirect(`/dashboard/restaurant/${restaurant.id}`)
    revalidatePath('/dashboard/restaurant')
  } catch (error) {
    console.log(error);
  }
};

export async function getRestaurant(userId : string){
  try {
    const restaurant = await prisma.restaurant.findFirst({
      where:{
        ownerId: userId
      }
    })
    return restaurant
  } catch (error) {
    console.log(error)
  }
}