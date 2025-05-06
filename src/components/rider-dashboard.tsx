"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Clock, MapPin, Package, Truck, User } from "lucide-react";

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

export default function DeliveryDashboard({ riderId }: { riderId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [riderOrders, setRiderOrders] = useState<Order[]>([]);
  //   const [ordersToPick, setOrdersToPick] = useState<Order[]>([])
  //   const [ordersToDeliver, setOrdersToDeliver] = useState<Order[]>([])
  //   const [deliveredOrders, setDeliveredOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order>();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  function getOrdersWithReadyStatus(orders: Order[]) {
    return orders.filter(
      (order) =>
        order.status.trim().toLowerCase() === "order ready".toLowerCase(),
    );
  }

  function getOrdersWithOutForDeliveryStatus(riderOrders: Order[]) {
    return riderOrders.filter(
      (order) =>
        order.status.trim().toLowerCase() ===
        "order out for delivery".toLowerCase(),
    );
  }

  function getOrdersWithDeliveredStatus(riderOrders: Order[]) {
    return riderOrders.filter(
      (order) =>
        order.status.trim().toLowerCase() === "order delivered".toLowerCase(),
    );
  }

  const orderToPick = getOrdersWithReadyStatus(orders);
  const orderOutForDelivery = getOrdersWithOutForDeliveryStatus(orders);
  const orderDelivered = getOrdersWithDeliveredStatus(orders);

  console.log(orders);

  // Count orders by status
  const toPickupCount = orderToPick.length;
  const inProgressCount = orderOutForDelivery.length;
  const deliveredCount = orderDelivered.length;

  function getFormattedTimestamp(): string {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: true });
  }

  const orderTimeStamp = getFormattedTimestamp();

  useEffect(() => {
    async function fetchOrders() {
      const data = await checkForNewOrderToPickup();
      if (data && Array.isArray(data)) {
        setOrders(data);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    async function fetchRiderOrders() {
      const data = await riderAcceptedOrders(riderId);
      if (data && Array.isArray(data)) {
        setRiderOrders(data);
      }
    }
    fetchRiderOrders();
  }, []);

  // Handle picking up an order
  const handlePickup = async (orderId: string) => {
    markOrderAsOutForDelivery(orderId, riderId);
  };

  // Handle marking an order as delivered
  const handleDeliver = async (orderId: string) => {
    markOrderAsDelivered(orderId);
    setConfirmDialogOpen(false);
  };

  // Open confirmation dialog
  const openConfirmDialog = (order: Order) => {
    setSelectedOrder(order);
    setConfirmDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Delivery Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, Alex Rodriguez
              </p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-sm font-medium">Agent #42</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-sm font-medium">On duty</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                To Pick Up
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Package className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-2xl font-bold">{toPickupCount}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-2xl font-bold">{inProgressCount}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Delivered Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-2xl font-bold">{deliveredCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Orders */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="to-pickup">
          <TabsList className="mb-4">
            <TabsTrigger value="to-pickup">
              To Pick Up <Badge className="ml-2">{toPickupCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress <Badge className="ml-2">{inProgressCount}</Badge>
            </TabsTrigger>
            <TabsTrigger value="delivered">
              Delivered <Badge className="ml-2">{deliveredCount}</Badge>
            </TabsTrigger>
          </TabsList>

          {/* To Pick Up Tab */}
          <TabsContent value="to-pickup">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orderToPick.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{order.id}</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200"
                      >
                        To Pick Up
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex">
                        <User className="h-5 w-5 text-muted-foreground mr-2" />
                        <span>customer</span>
                      </div>
                      <div className="flex">
                        <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                        <span className="text-sm">{order.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex">
                          <Package className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm">
                            {order.orderItems.length}
                          </span>
                        </div>
                        <div className="flex">
                          <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm">{orderTimeStamp}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handlePickup(order.id)}
                    >
                      Pick Up Order
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {orderToPick.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">No orders to pick up</h3>
                  <p className="text-muted-foreground">
                    All orders have been picked up.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* In Progress Tab */}
          <TabsContent value="in-progress">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orderOutForDelivery.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{order.id}</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        In Progress
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex">
                        <User className="h-5 w-5 text-muted-foreground mr-2" />
                        <span>customer</span>
                      </div>
                      <div className="flex">
                        <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                        <span className="text-sm">{order.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex">
                          <Package className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm">
                            {order.orderItems.length}
                          </span>
                        </div>
                        <div className="flex">
                          <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm">{orderTimeStamp}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => openConfirmDialog(order)}
                    >
                      Mark as Delivered
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {orderOutForDelivery.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <Truck className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">No orders in progress</h3>
                  <p className="text-muted-foreground">
                    Pick up some orders to deliver.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Delivered Tab */}
          <TabsContent value="delivered">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orderDelivered.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{order.id}</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Delivered
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex">
                        <User className="h-5 w-5 text-muted-foreground mr-2" />
                        <span>customer</span>
                      </div>
                      <div className="flex">
                        <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                        <span className="text-sm">{order.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex">
                          <Package className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm">
                            {order.orderItems.length}
                          </span>
                        </div>
                        <div className="flex">
                          <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm">{orderTimeStamp}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {orderDelivered.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <CheckCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-lg font-medium">No delivered orders</h3>
                  <p className="text-muted-foreground">
                    Delivered orders will appear here.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delivery</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this order as delivered?
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{selectedOrder.id}</span>
                <span>customer</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center mb-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  {selectedOrder.address}
                </div>
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  {selectedOrder.orderItems.length}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => selectedOrder && handleDeliver(selectedOrder.id)}
            >
              Confirm Delivery
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
