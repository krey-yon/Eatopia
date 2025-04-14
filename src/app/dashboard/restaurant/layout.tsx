import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { getCurrentSession } from "@/lib/cookie"
import { getRestaurant } from "./action"

// This is a mock function to get the restaurant ID
// In a real app, you would get this from authentication or context
async function getRestaurantId() {
  // return "/menu/419d45f1-b271-495b-8418-d66c78a91c68" // Mock restaurant ID
  const { user } = await getCurrentSession()
  const OwnerId = user?.id
  const restaurant = await getRestaurant(OwnerId!)
  const restaurantId = restaurant?.id
  return restaurantId
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const restaurantId =  await getRestaurantId()


  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar restaurantId={restaurantId} />
      <main className="flex-1 p-6 pt-2 md:p-8">{children}</main>
    </div>
  )
}
