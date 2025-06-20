"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Package,
  ShoppingBag,
  Truck,
  RefreshCcw,
  Star,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getCurrentSession } from "@/lib/cookie";
import { ROLE } from "@/lib/definitions";
import { findOrderWithUserId } from "@/actions/order";
import { useQueryData } from "@/hooks/useQueryData";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

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

type User = {
  address: string;
  id: string;
  name: string;
  role: ROLE;
  email: string;
  password: string | null;
};

type OrderData = {
  data: unknown;
  isPending: boolean;
  isFetched: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
  isFetching: boolean;
};

// Seeded random function for consistent results
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) / 2147483647;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isRotating, setIsRotating] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  const userData = useQueryData(["userData-for-userOrderPage"], () =>
    getCurrentSession()
  );

  console.log(activeTab)

  const userId = userData.data as User;
  const orderData = useQueryData(["orderData-for-userPage"], () =>
    findOrderWithUserId(userId?.id)
  );

  useEffect(() => {
    if (orderData.data !== undefined && Array.isArray(orderData.data)) {
      setOrders(orderData.data as Order[]);
    }
  }, [orderData.data]);

  const activeOrders = orders.filter(
    (order) => order.status.toLowerCase() !== "order delivered"
  );
  const completedOrders = orders.filter(
    (order) => order.status.toLowerCase() === "order delivered"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  My Orders
                </h1>
                <p className="text-gray-600 text-sm">
                  Track your delicious meals
                </p>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {activeOrders.length}
                </div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {completedOrders.length}
                </div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Tabs */}
        <Tabs
          defaultValue="active"
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-white shadow-lg border border-gray-200 rounded-2xl p-2 h-auto">
            <TabsTrigger
              value="active"
              className="flex items-center gap-3 px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all duration-300"
            >
              <Clock className="h-4 w-4" />
              Active Orders
              {activeOrders?.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-current hover:bg-white/30"
                >
                  {activeOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex items-center gap-3 px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all duration-300"
            >
              <CheckCircle className="h-4 w-4" />
              Completed Orders
              {completedOrders?.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-current hover:bg-white/30"
                >
                  {completedOrders.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeOrders.length === 0 ? (
              <EmptyState
                icon={<Clock className="h-16 w-16" />}
                title="No Active Orders"
                description="You don't have any active orders at the moment."
                buttonText="Browse Restaurants"
                buttonIcon={<ShoppingBag className="h-4 w-4 mr-2" />}
                gradientFrom="from-orange-500"
                gradientTo="to-red-500"
              />
            ) : (
              <div className="grid gap-6">
                {activeOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <OrderCard
                      orderData={orderData}
                      order={order}
                      isRotating={isRotating}
                      setIsRotating={setIsRotating}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedOrders.length === 0 ? (
              <EmptyState
                icon={<CheckCircle className="h-16 w-16" />}
                title="No Completed Orders"
                description="You don't have any completed orders yet."
                buttonText="Browse Restaurants"
                buttonIcon={<ShoppingBag className="h-4 w-4 mr-2" />}
                gradientFrom="from-green-500"
                gradientTo="to-green-600"
              />
            ) : (
              <div className="grid gap-6">
                {completedOrders.map((order, index) => (
                  <div
                    key={order.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <OrderCard
                      orderData={orderData}
                      order={order}
                      isRotating={isRotating}
                      setIsRotating={setIsRotating}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
  buttonText,
  buttonIcon,
  gradientFrom,
  gradientTo,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}) {
  return (
    <div className="text-center py-16">
      <div
        className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 text-white opacity-80`}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      <Link href="/dashboard">
        <Button
          className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
        >
          {buttonIcon}
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}

function OrderCard({
  order,
  isRotating,
  orderData,
  setIsRotating,
}: {
  order: Order;
  isRotating: boolean;
  orderData: OrderData;
  setIsRotating: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Generate stable timestamp using order ID as seed
  const orderTimestamp = useMemo(() => {
    const seed = order.id;
    const random = seededRandom(seed + "timestamp");

    // Generate a time within the last 24 hours
    const now = new Date();
    const hoursAgo = Math.floor(random * 24);
    const minutesAgo = Math.floor(seededRandom(seed + "minutes") * 60);

    const orderTime = new Date(
      now.getTime() - hoursAgo * 60 * 60 * 1000 - minutesAgo * 60 * 1000
    );

    return orderTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "numeric",
    });
  }, [order.id]);

  const handleClick = () => {
    setIsRotating(true);
    orderData.refetch();
    setTimeout(() => setIsRotating(false), 1000);
  };

  const isCompleted = order.status.toLowerCase() === "order delivered";

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 shadow-lg group bg-white">
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                {order.restaurantId.charAt(0).toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                  {order.restaurantId}
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{orderTimestamp}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <OrderStatusBadge status={order.status} />
            <button
              onClick={handleClick}
              className="bg-white/50 hover:bg-white/80 rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
              <RefreshCcw
                className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                  isRotating ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 flex items-center">
            <Star className="h-4 w-4 text-orange-500 mr-2" />
            Order Items
          </h4>
          {order.orderItems.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-300 to-red-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {item.name.charAt(0)}
                </div>
                <span className="font-medium text-gray-800">{item.name}</span>
              </div>
              <span className="font-bold text-gray-800">
                ${item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="bg-gradient-to-r from-orange-200 to-red-200 h-0.5" />

        {/* Total */}
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
          <span className="text-lg font-bold text-gray-800">Total Amount</span>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            $
            {order.orderItems
              .reduce((sum, item) => sum + item.price, 0)
              .toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <div className="w-full space-y-4">
          {/* Delivery Address */}
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl">
            <MapPin className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-blue-900">Delivery Address</p>
              <p className="text-sm text-blue-700">{order.address}</p>
            </div>
          </div>

          {/* Order Status Tracker */}
          {!isCompleted && <OrderStatusTracker status={order.status} />}

          {/* Completed Order Actions */}
          {/* {isCompleted && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 hover:bg-orange-50 hover:border-orange-300 transition-colors"
              >
                Reorder
              </Button>
              <Button
                variant="outline"
                className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                Rate & Review
              </Button>
            </div>
          )} */}
        </div>
      </CardFooter>
    </Card>
  );
}

function OrderStatusBadge({ status }: { status: Order["status"] }) {
  const statusConfig = {
    "Order Placed": {
      className:
        "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    "Order Ready": {
      className:
        "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg",
      icon: <Package className="h-3 w-3 mr-1" />,
    },
    "order out for delivery": {
      className:
        "bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg",
      icon: <Truck className="h-3 w-3 mr-1" />,
    },
    "order delivered": {
      className:
        "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] ||
    statusConfig["Order Placed"];

  return (
    <Badge
      className={`${config.className} animate-pulse hover:animate-none transition-all duration-300 px-3 py-1`}
    >
      {config.icon}
      {status}
    </Badge>
  );
}

function OrderStatusTracker({ status }: { status: Order["status"] }) {
  const steps = [
    { key: "Order Placed", icon: Clock, label: "Order Placed" },
    { key: "Order Ready", icon: Package, label: "Preparing" },
    { key: "order out for delivery", icon: Truck, label: "On the Way" },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === status);

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <h4 className="font-semibold text-gray-800 mb-4">Order Progress</h4>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div
                className={`
                rounded-full p-3 transition-all duration-500 transform
                ${
                  isActive
                    ? "bg-gradient-to-r from-orange-400 to-red-400 text-white scale-110"
                    : "bg-gray-100 text-gray-400"
                }
                ${isCurrent ? "animate-pulse" : ""}
              `}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                  isActive ? "text-orange-600" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>

              {index < steps.length - 1 && (
                <div
                  className={`
                  h-0.5 flex-1 mx-4 mt-6 transition-all duration-500
                  ${
                    index < currentStepIndex
                      ? "bg-gradient-to-r from-orange-400 to-red-400"
                      : "bg-gray-200"
                  }
                `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
