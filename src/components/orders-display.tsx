"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { subscribeToOrders, markOrderAsReady } from "@/lib/order";
import { checkForNewOrder, markOrderAsReady } from "@/actions/order";

type OrderItem = {
  id: string;
  name: string;
  orderId: string;
  price: number;
};

type Order = {
  orderItems: OrderItem[];
  restaurantId: string;
  id: string;
  status: string;
  userId: string;
  riderId: string | null;
};

export function OrdersDisplay({ restaurantId }: { restaurantId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStatus, setOrderStatus] = useState("pending");

  function getFormattedTimestamp(): string {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: true });
  }

  const orderTimeStamp = getFormattedTimestamp();

  // useEffect(() => {
  //   async function checkOrderStatus(){
  //     const orderStatus = await checkForNewOrder(restaurantId)
  //     setIsUpForCooking(orderStatus!)
  //   }
  // }, [restaurantId])

  function getOrdersWithPlacedStatus(orders: Order[]) {
    return orders.filter(
      (order) =>
        order.status.trim().toLowerCase() === "order placed".toLowerCase(),
    );
  }

  useEffect(() => {
    async function fetchOrders() {
      const order = await checkForNewOrder(restaurantId);

      if (order && Array.isArray(order)) {
        const filteredOrders = getOrdersWithPlacedStatus(order);
        setOrders(filteredOrders);
        console.log(filteredOrders);
      }
      console.log(orderStatus);
      console.log(order);
    }
    fetchOrders();
  }, [restaurantId, orderStatus]);

  // useEffect(() => {
  //   // Subscribe to Redis pub/sub channel for orders
  //   const unsubscribe = subscribeToOrders(restaurantId, (newOrder) => {
  //     setOrders((prevOrders) => [...prevOrders, newOrder]);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [restaurantId]);

  const handleMarkAsReady = async (orderId: string) => {
    await markOrderAsReady(orderId);
    setOrderStatus("Completed");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Live Orders</h2>
        <Badge variant="outline" className="px-3 py-1">
          {orders.filter((order) => order.status === "pending").length} pending
        </Badge>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No orders yet. Waiting for new orders...
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders?.map((order) => (
            <Card
              key={order.orderItems[0].orderId}
              className={
                order.status === "ready" ? "border-green-200 bg-green-50" : ""
              }
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Order #{order.orderItems[0].orderId.slice(0, 8)}
                  </CardTitle>
                  {/* <Badge
                    variant={order.status === "ready" ? "default" : "secondary"}
                  >
                    {order.status}
                  </Badge> */}
                </div>
                <CardDescription>{orderTimeStamp}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {order.orderItems.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">x 1</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {orderStatus == "pending" ? (
                  <Button
                    className="w-full"
                    onClick={() => handleMarkAsReady(order.id)}
                  >
                    Mark as Ready
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Completed
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
