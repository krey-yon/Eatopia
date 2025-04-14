"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getMenuItems } from "@/app/dashboard/restaurant/action"
// import { getMenuItems } from "@/lib/menu"

type MenuItem = {
  id: string
  name: string
  price: number
  imageUrl: string
}

export function MenuItemsList({ menuId }: { menuId: string }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems(menuId)
        console.log(items)
        setMenuItems(items)
      } catch (error) {
        console.error("Failed to fetch menu items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [menuId])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Items</CardTitle>
        <CardDescription>Your current menu offerings</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        ) : menuItems.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">No menu items yet. Add your first item above.</div>
        ) : (
          <div className="space-y-4">
            {menuItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-lg border p-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
