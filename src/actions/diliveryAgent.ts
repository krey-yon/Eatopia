"use server";

import prisma from "@/lib/db";

export const checkForNewOrderToPickup = async () => {
  try {
    const order = await prisma.order.findMany({
      include: {
        orderItems: true,
      },
    });
    // const isUpForPickup = order.some((o) => o.status === "Order Ready");
    if (order) {
      return order;
    }
    return {
      message: "no order to pickup",
    };
  } catch (error) {
    console.log(error);
  }
};

export const markOrderAsOutForDelivery = async (
  orderId: string,
  riderId: string,
) => {
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "order out for delivery",
        riderId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const markOrderAsDelivered = async (orderId: string) => {
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "order delivered",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const riderAcceptedOrders = async (riderId: string) => {
  try {
    const order = await prisma.order.findMany({
      where: {
        riderId,
      },
      include: {
        orderItems: true,
      },
    });
    // const isUpForPickup = order.some((o) => o.status === "Order Ready");
    if (order) {
      return order;
    }
    return {
      message: "no order to pickup",
    };
  } catch (error) {
    console.log(error);
  }
};
