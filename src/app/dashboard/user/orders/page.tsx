"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Package, ShoppingBag, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getOrders, type Order } from "@/lib/orders"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState("active")

  useEffect(() => {
    // Load orders from localStorage
    const loadedOrders = getOrders()
    setOrders(loadedOrders)
  }, [])

  const activeOrders = orders.filter((order) => order.status !== "delivered")
  const completedOrders = orders.filter((order) => order.status === "delivered")

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">My Orders</h1>
      </div>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="active" className="flex gap-2">
            Active Orders
            {activeOrders.length > 0 && <Badge variant="secondary">{activeOrders.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="completed">Completed Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No active orders</h3>
              <p className="mt-2 text-sm text-muted-foreground">You don't have any active orders at the moment.</p>
              <Link href="/">
                <Button className="mt-4">Browse Restaurants</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {activeOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No completed orders</h3>
              <p className="mt-2 text-sm text-muted-foreground">You don't have any completed orders yet.</p>
              <Link href="/">
                <Button className="mt-4">Browse Restaurants</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.restaurantName}</CardTitle>
            <p className="text-sm text-muted-foreground">{new Date(order.timestamp).toLocaleString()}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <p className="text-sm text-muted-foreground mb-2">Delivery Address:</p>
          <p className="text-sm">{order.address}</p>
          {order.status !== "delivered" && <OrderStatusTracker status={order.status} />}
        </div>
      </CardFooter>
    </Card>
  )
}

function OrderStatusBadge({ status }: { status: Order["status"] }) {
  switch (status) {
    case "placed":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Order Placed
        </Badge>
      )
    case "ready":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Ready for Pickup
        </Badge>
      )
    case "out-for-delivery":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          Out for Delivery
        </Badge>
      )
    case "delivered":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Delivered
        </Badge>
      )
  }
}

function OrderStatusTracker({ status }: { status: Order["status"] }) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex flex-col items-center">
        <div
          className={`rounded-full p-1.5 ${status === "placed" || status === "ready" || status === "out-for-delivery" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
        >
          <Clock className="h-4 w-4" />
        </div>
        <span className="text-xs mt-1">Placed</span>
      </div>
      <div
        className={`h-0.5 flex-1 mx-1 ${status === "ready" || status === "out-for-delivery" ? "bg-green-500" : "bg-gray-200"}`}
      />
      <div className="flex flex-col items-center">
        <div
          className={`rounded-full p-1.5 ${status === "ready" || status === "out-for-delivery" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
        >
          <Package className="h-4 w-4" />
        </div>
        <span className="text-xs mt-1">Ready</span>
      </div>
      <div className={`h-0.5 flex-1 mx-1 ${status === "out-for-delivery" ? "bg-green-500" : "bg-gray-200"}`} />
      <div className="flex flex-col items-center">
        <div
          className={`rounded-full p-1.5 ${status === "out-for-delivery" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
        >
          <Truck className="h-4 w-4" />
        </div>
        <span className="text-xs mt-1">Delivery</span>
      </div>
    </div>
  )
}
