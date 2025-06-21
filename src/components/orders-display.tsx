"use client";

import { useEffect, useState, useMemo } from "react";
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
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  ChefHat,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  DollarSign,
  User,
  Package,
} from "lucide-react";
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

// Seeded random function for consistent timestamps
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647;
}

export function OrdersDisplay({ restaurantId }: { restaurantId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStatus, setOrderStatus] = useState("pending");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate stable timestamps for orders
  const orderTimestamps = useMemo(() => {
    const timestamps: { [key: string]: string } = {};
    orders.forEach((order) => {
      const seed = order.id;
      const random = seededRandom(seed);
      const minutesAgo = Math.floor(random * 30); // 0-30 minutes ago
      const orderTime = new Date(Date.now() - minutesAgo * 60 * 1000);
      timestamps[order.id] = orderTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    });
    return timestamps;
  }, [orders]);

  function getOrdersWithPlacedStatus(orders: Order[]) {
    return orders.filter(
      (order) =>
        order.status.trim().toLowerCase() === "order placed".toLowerCase()
    );
  }

  const refreshOrders = async () => {
    setIsRefreshing(true);
    const order = await checkForNewOrder(restaurantId);
    if (order && Array.isArray(order)) {
      const filteredOrders = getOrdersWithPlacedStatus(order);
      setOrders(filteredOrders);
    }
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  useEffect(() => {
    refreshOrders();
  }, [restaurantId, orderStatus]);

  const handleMarkAsReady = async (orderId: string) => {
    await markOrderAsReady(orderId);
    setOrderStatus("Completed");
  };

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum + order.orderItems.reduce((itemSum, item) => itemSum + item.price, 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Kitchen Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your incoming orders efficiently
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={refreshOrders}
                variant="outline"
                className="flex items-center gap-2 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>

              <Badge
                variant="outline"
                className="px-4 py-2 text-lg bg-gradient-to-r from-orange-100 to-red-100 border-orange-300 text-orange-700"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                {orders.length} Active Orders
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Pending Orders
                  </p>
                  <p className="text-3xl font-bold">{orders.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Revenue Today
                  </p>
                  <p className="text-3xl font-bold">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    Avg. Prep Time
                  </p>
                  <p className="text-3xl font-bold">12 min</p>
                </div>
                <Clock className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        {orders.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-16 pb-16 text-center">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <ChefHat className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                All Caught Up!
              </h3>
              <p className="text-gray-600 mb-6">
                No new orders at the moment. Time for a coffee break! ☕
              </p>
              <Button
                onClick={refreshOrders}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Check for New Orders
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {orders?.map((order, index) => (
              <Card
                key={order.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-orange-50 border-b border-orange-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                        #{order.id.slice(-2)}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-800">
                          Order #{order.id.slice(0, 8)}
                        </CardTitle>
                        <CardDescription className="flex items-center text-gray-600">
                          <Clock className="w-3 h-3 mr-1" />
                          {orderTimestamps[order.id]}
                        </CardDescription>
                      </div>
                    </div>

                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 animate-pulse">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <Package className="w-4 h-4 mr-2 text-orange-500" />
                      Order Items
                    </h4>
                    {order.orderItems.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-orange-700 text-sm font-bold">
                            {item.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-800">
                            {item.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">Qty: 1</span>
                          <div className="font-bold text-gray-800">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-gradient-to-r from-orange-200 to-red-200 h-0.5" />

                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <span className="font-semibold text-gray-800">
                      Total Amount
                    </span>
                    <span className="text-xl font-bold text-green-700">
                      $
                      {order.orderItems
                        .reduce((sum, item) => sum + item.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-xl">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Customer ID: {order.userId.slice(0, 8)}</span>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleMarkAsReady(order.id)}
                    disabled={orderStatus === "Completed"}
                  >
                    {orderStatus === "Completed" ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Order Completed
                      </>
                    ) : (
                      <>
                        <ChefHat className="w-5 h-5 mr-2" />
                        Mark as Ready
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
