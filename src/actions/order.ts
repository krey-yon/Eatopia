"use server";

import prisma from "@/lib/db";

interface OrderData {
  userId: string;
  restaurantId: string;
  address: string;
  itemDetails: {
    name: string;
    price: number;
  };
}

export const addOrder = async (orderData: OrderData) => {
  try {
    const order = await prisma.order.create({
      data: {
        status: "Order Placed",
        userId: orderData.userId,
        restaurantId: orderData.restaurantId,
        orderItems: {
          create: {
            name: orderData.itemDetails.name,
            price: orderData.itemDetails.price,
          },
        },
        address: orderData.address,
      },
      include: {
        orderItems: true,
        user: true,
        restaurant: true,
      },
    });
    return order;
  } catch (error) {
    console.log(error);
  }
};

export const checkForNewOrder = async (restaurantId: string) => {
  try {
    const order = await prisma.order.findMany({
      where: {
        restaurantId,
      },
      include: {
        orderItems: true,
      },
    });
    const isUpForCooking = order.some((o) => o.status === "Order Placed");
    // return isUpForCooking

    if (isUpForCooking) {
      return order;
    }
    return {
      message: "no order for now",
    };
  } catch (error) {
    console.log(error);
  }
};

export const markOrderAsReady = async (orderId: string) => {
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "Order Ready",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const findOrderWithUserId = async (userId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: true,
      },
    });
    return orders;
  } catch (error) {
    console.log(error);
  }
};
