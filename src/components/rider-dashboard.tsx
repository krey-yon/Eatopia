"use client";

import { useState, useEffect, useMemo } from "react";
import {
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Truck,
  User,
  Bike,
  Timer,
  Star,
  Navigation,
  RefreshCw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  checkForNewOrderToPickup,
  markOrderAsDelivered,
  markOrderAsOutForDelivery,
  riderAcceptedOrders,
} from "@/actions/diliveryAgent";
import { useQueryData } from "@/hooks/useQueryData";

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
  address: string;
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

export default function DeliveryDashboard({
  riderId,
  riderName,
}: {
  riderId: string;
  riderName: string;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [riderOrders, setRiderOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order>();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Generate stable timestamps for orders using useMemo
  const orderTimestamps = useMemo(() => {
    const timestamps: { [key: string]: string } = {};
    [...orders, ...riderOrders].forEach((order) => {
      const seed = order.id;
      const random = seededRandom(seed);
      const minutesAgo = Math.floor(random * 120); // 0-120 minutes ago
      const orderTime = new Date(Date.now() - minutesAgo * 60 * 1000);
      timestamps[order.id] = orderTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    });
    return timestamps;
  }, [orders, riderOrders]);

  function getOrdersWithReadyStatus(orders: Order[]) {
    return orders.filter(
      (order) =>
        order.status.trim().toLowerCase() === "order ready".toLowerCase()
    );
  }

  function getOrdersWithOutForDeliveryStatus(riderOrders: Order[]) {
    return riderOrders.filter(
      (order) =>
        order.status.trim().toLowerCase() ===
        "order out for delivery".toLowerCase()
    );
  }

  function getOrdersWithDeliveredStatus(riderOrders: Order[]) {
    return riderOrders.filter(
      (order) =>
        order.status.trim().toLowerCase() === "order delivered".toLowerCase()
    );
  }

  const orderToPick = getOrdersWithReadyStatus(orders);
  const orderOutForDelivery = getOrdersWithOutForDeliveryStatus(riderOrders);
  const orderDelivered = getOrdersWithDeliveredStatus(riderOrders);

  // Count orders by status
  const toPickupCount = orderToPick.length;
  const inProgressCount = orderOutForDelivery.length;
  const deliveredCount = orderDelivered.length;

  const NewOrdersToPickUp = useQueryData(["orders-to-pickup"], () =>
    checkForNewOrderToPickup()
  );
  const orderAccepterByRider = useQueryData(["order-accepted-by-rider"], () =>
    riderAcceptedOrders(riderId)
  );

  useEffect(() => {
    if (
      NewOrdersToPickUp.data !== undefined &&
      Array.isArray(NewOrdersToPickUp.data)
    ) {
      setOrders(NewOrdersToPickUp.data);
    }
  }, [NewOrdersToPickUp.data]);

  useEffect(() => {
    if (
      orderAccepterByRider.data !== undefined &&
      Array.isArray(orderAccepterByRider.data)
    ) {
      setRiderOrders(orderAccepterByRider.data);
    }
  }, [orderAccepterByRider.data]);

  // Handle picking up an order
  const handlePickup = async (orderId: string) => {
    try {
      await markOrderAsOutForDelivery(orderId, riderId);
      await Promise.all([
        NewOrdersToPickUp.refetch(),
        orderAccepterByRider.refetch(),
      ]);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Error picking up order:", error);
    }
  };

  // Handle marking an order as delivered
  const handleDeliver = async (orderId: string) => {
    try {
      await markOrderAsDelivered(orderId);
      await orderAccepterByRider.refetch();
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    }
  };

  // Open confirmation dialog
  const openConfirmDialog = (order: Order) => {
    setSelectedOrder(order);
    setConfirmDialogOpen(true);
  };

  const refreshData = async () => {
    await Promise.all([
      NewOrdersToPickUp.refetch(),
      orderAccepterByRider.refetch(),
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-blue-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Bike className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Delivery Dashboard
                </h1>
                <p className="text-gray-600 font-medium">
                  Welcome back, {riderName}
                </p>
              </div>
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-6">
              <Button
                onClick={refreshData}
                variant="outline"
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                  <User className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-700">
                    Rider #{riderId.slice(-4)}
                  </span>
                </div>
                <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">
                    To Pick Up
                  </p>
                  <p className="text-3xl font-bold">{toPickupCount}</p>
                </div>
                <Package className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    In Progress
                  </p>
                  <p className="text-3xl font-bold">{inProgressCount}</p>
                </div>
                <Truck className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Delivered Today
                  </p>
                  <p className="text-3xl font-bold">{deliveredCount}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Orders */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="to-pickup" className="space-y-6">
          <TabsList className="bg-white shadow-md border border-gray-200 p-1 rounded-xl">
            <TabsTrigger
              value="to-pickup"
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white font-semibold"
            >
              <Package className="w-4 h-4 mr-2" />
              To Pick Up
              <Badge className="ml-2 bg-yellow-100 text-yellow-700">
                {toPickupCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white font-semibold"
            >
              <Truck className="w-4 h-4 mr-2" />
              In Progress
              <Badge className="ml-2 bg-blue-100 text-blue-700">
                {inProgressCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white font-semibold"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Delivered
              <Badge className="ml-2 bg-green-100 text-green-700">
                {deliveredCount}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* To Pick Up Tab */}
          <TabsContent value="to-pickup">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orderToPick.map((order, index) => (
                <Card
                  key={order.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                          #{order.id.slice(-2)}
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-800">
                          Order #{order.id.slice(0, 8)}
                        </CardTitle>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 animate-pulse">
                        <Timer className="w-3 h-3 mr-1" />
                        Ready
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <User className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-800">
                        Customer #{order.userId.slice(-4)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-700 font-medium">
                        {order.address}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-lg">
                        <Package className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700">
                          {order.orderItems.length} items
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-700">
                          {orderTimestamps[order.id]}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={() => handlePickup(order.id)}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Pick Up Order
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {orderToPick.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    All Orders Picked Up!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Great job! All available orders have been collected.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* In Progress Tab */}
          <TabsContent value="in-progress">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orderOutForDelivery.map((order, index) => (
                <Card
                  key={order.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
                          #{order.id.slice(-2)}
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-800">
                          Order #{order.id.slice(0, 8)}
                        </CardTitle>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-300 animate-pulse">
                        <Truck className="w-3 h-3 mr-1" />
                        En Route
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <User className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-800">
                        Customer #{order.userId.slice(-4)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-700 font-medium">
                        {order.address}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-lg">
                        <Package className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-700">
                          {order.orderItems.length} items
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-700">
                          {orderTimestamps[order.id]}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      onClick={() => openConfirmDialog(order)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Delivered
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {orderOutForDelivery.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Truck className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No Active Deliveries
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Pick up some orders to start delivering!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Delivered Tab */}
          <TabsContent value="delivered">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orderDelivered.map((order, index) => (
                <Card
                  key={order.id}
                  className="border-0 shadow-lg bg-white overflow-hidden opacity-75"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">
                          ✓
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-800">
                          Order #{order.id.slice(0, 8)}
                        </CardTitle>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Delivered
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-700">
                        Customer #{order.userId.slice(-4)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-600 font-medium">
                        {order.address}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                        <Package className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">
                          {order.orderItems.length} items
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-600">
                          Completed
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {orderDelivered.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No Delivered Orders Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Completed deliveries will appear here.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="max-w-md mx-auto bg-white border-0 shadow-2xl">
          <DialogHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Confirm Delivery
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Are you sure this order has been successfully delivered to the
              customer?
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="py-4 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-800">
                    Order #{selectedOrder.id.slice(0, 8)}
                  </span>
                  <span className="text-sm text-gray-600">
                    Customer #{selectedOrder.userId.slice(-4)}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    {selectedOrder.address}
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2 text-blue-600" />
                    {selectedOrder.orderItems.length} items delivered
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => selectedOrder && handleDeliver(selectedOrder.id)}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Delivery
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
