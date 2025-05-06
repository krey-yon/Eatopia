"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { OrderModal } from "@/components/order-modal"
// import { TrackOrderModal } from "@/components/track-order-modal"
// import { restaurants, menuItems } from "@/lib/data"
// import { addOrder } from "@/lib/orders"
import { MenuItemsType, RestaurantInfoProps } from "@/lib/definitions"
import { fetchRestaurantMenu, restaurantInfo } from "@/actions/restaurant"
import { addOrder } from "@/actions/order"

export default function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  // const [trackModalOpen, setTrackModalOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderStatus, setOrderStatus] = useState("placed")
  const [orderId, setOrderId] = useState<string | null>(null)
  const [restaurant, setRestaurant] = useState<RestaurantInfoProps | null>(null)
  const [restaurantMenu, setRestaurantMenu] = useState<MenuItemsType[] | null>(null);


  const {id} = use(params)
  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const data = await restaurantInfo(id);
        
        if (data) {
          setRestaurant(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRestaurantInfo();
  }, [id]);


  useEffect(() => {
    const fetchMenuItemsInfo = async () => {
      try {
        const data = await fetchRestaurantMenu(id);
        if (data && Array.isArray(data)) {
          setRestaurantMenu(data);
        } 
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenuItemsInfo()
  }, [id])
  // console.log(restaurantMenu)
  const diliveryTime = Math.floor(Math.random() * (50 - 40) + 40) + " Min";
  
  // const restaurant = restaurants.find((r) => r.id === params.id)
  // const restaurantMenu = menuItems.filter((item) => item.restaurantId === params.id)

  if (!restaurant) {
    return <div>Restaurant not found</div>
  }

  const handleAddToOrder = (itemId: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev
      }
      return [...prev, itemId]
    })
  }

  const handlePlaceOrder = async (address: string) => {
    const selectedMenuItems = selectedItems.map((id) => restaurantMenu?.find((item) => item.id === id)!)
    // const newOrderId = addOrder({
    //   restaurantId: restaurant.id,
    //   restaurantName: restaurant.name,
    //   items: selectedMenuItems,
    //   status: "placed",
    //   address,
    //   timestamp: new Date().toISOString(),
    //   total: selectedMenuItems.reduce((sum, item) => sum + item.price, 0) + 2.99,
    // })


    const orderData = {
      userId: restaurant.ownerId,
      restaurantId: restaurant.id,
      address,
      itemDetails: {
        name: selectedMenuItems[0].name,
        price: selectedMenuItems[0].price,
      }
    }
    console.log(orderData)
    const order = await addOrder(orderData)

    console.log(order)
    console.log(order?.id)

    setOrderId(order?.id!)
    setOrderPlaced(true)
    setOrderModalOpen(false)
    // setTrackModalOpen(true)

    // Simulate order status changes
    // setTimeout(() => {
    //   setOrderStatus("ready")
    //   if (newOrderId) updateOrderStatus(newOrderId, "ready")
    // }, 5000)

    // setTimeout(() => {
    //   setOrderStatus("out-for-delivery")
    //   if (newOrderId) updateOrderStatus(newOrderId, "out-for-delivery")
    // }, 10000)

    // setTimeout(() => {
    //   setOrderStatus("delivered")
    //   if (newOrderId) updateOrderStatus(newOrderId, "delivered")
    // }, 15000)
  }

  // const updateOrderStatus = (id: string, status: string) => {
  //   // In a real app, this would update the order in the database
  //   // For this demo, we're just updating the local state
  //   const orders = JSON.parse(localStorage.getItem("orders") || "[]")
  //   const updatedOrders = orders.map((order: any) => (order.id === id ? { ...order, status } : order))
  //   localStorage.setItem("orders", JSON.stringify(updatedOrders))
  // }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{restaurant.name}</h1>
      </div>

      <div className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
        <Image src={restaurant.imageUrl || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <Badge variant="outline" className="mr-2">
            {restaurant.cuisine}
          </Badge>
          <span className="text-sm text-muted-foreground">{diliveryTime} delivery time</span>
        </div>

        <div className="flex gap-2">
          {/* {orderPlaced && (
            <Button variant="outline" onClick={() => setTrackModalOpen(true)}>
              Track Order
            </Button>
          )} */}

          <Button onClick={() => setOrderModalOpen(true)} disabled={selectedItems.length === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Order ({selectedItems.length})
          </Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Menu</h2>
      <Separator className="mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantMenu?.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-40 w-full">
              <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{item.name}</h3>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>
              {/* <p className="text-sm text-muted-foreground mb-4">{item.description}</p> */}
              <Button
                variant={selectedItems.includes(item.id) ? "default" : "outline"}
                size="sm"
                className="w-full"
                onClick={() => handleAddToOrder(item.id)}
              >
                {selectedItems.includes(item.id) ? "Added to Order" : "Add to Order"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <OrderModal
        open={orderModalOpen}
        onOpenChange={setOrderModalOpen}
        selectedItems={selectedItems.map((id) => restaurantMenu?.find((item) => item.id === id)!)}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* <TrackOrderModal open={trackModalOpen} onOpenChange={setTrackModalOpen} status={orderStatus} orderId={orderId} /> */}
    </div>
  )
}
