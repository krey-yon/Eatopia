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

export async function createMenu(restaurantId: string){
  try {
    await prisma.menu.create({
      data:{
        restaurantId
      }
    })
    return {
      message: "menu created"
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getRestaurantMenu(restaurantId: string){
  try {
    const menu = await prisma.menu.findFirst({
      where:{
        restaurantId,
      },
      include:{
        menuItems: true
      }
    })

    return menu
  } catch (error) {
    console.log(error)
  }
}

export async function getMenuItems(menuId: string) {
  try {
    const menuItems = await prisma.menuItems.findMany({
      where: { menuId },
    })
    
    if (!menuItems) {
      return []
    }
    console.log(menuItems)
    return menuItems
  } catch (error) {
    console.error('Error fetching menu items:', error)
    throw new Error('Failed to fetch menu items')
  }
}

export async function addMenuItems( item : { name: string , price: number , imageUrl : string, menuId: string }) {
  // Simulate API delay
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const newItem = await prisma.menuItems.create({
    data:{
      ...item
    }
  })
  return newItem
  // return menuItems.filter((item) => item.menuId === menuId)
}