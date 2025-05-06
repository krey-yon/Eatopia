"use server";

import prisma from "@/lib/db";

export const restaurantInfo = async (restaurantId: string) => {
  try {
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: restaurantId,
      },
    });
    return restaurant;
  } catch (error) {
    console.log(error);
  }
};

export const allRestaurantData = async () => {
  try {
    const restaurants = await prisma.restaurant.findMany({});
    return restaurants;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRestaurantMenu = async (restaurantId: string) => {
  try {
    const menu = await prisma.menu.findFirst({
      where: {
        restaurantId,
      },
    });
    // if(!menu) return {
    //     message: "No menu find",
    //   };

    const menuItems = await prisma.menuItems.findMany({
      where: {
        menuId: menu?.id,
      },
    });
    return menuItems;
  } catch (error) {
    console.log(error);
  }
};
