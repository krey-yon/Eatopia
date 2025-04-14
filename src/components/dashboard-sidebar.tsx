"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClipboardList, Menu, Store } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardSidebar({ restaurantId = "default" }: { restaurantId?: string }) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard/restaurant",
      label: "Orders",
      icon: ClipboardList,
      active: pathname === "/dashboard/restaurant",
    },
    {
      href: `/dashboard/restaurant/menu/${restaurantId}`,
      label: "Menu",
      icon: Menu,
      active: pathname?.startsWith("/dashboard/restaurant"),
    },
  ]

  return (
    <div className="border-r bg-muted/40 md:w-64">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard/restaurant" className="flex items-center gap-2 font-semibold">
          <Store className="h-6 w-6" />
          <span>Restaurant Dashboard</span>
        </Link>
      </div>
      <div className="space-y-1 p-2">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={route.active ? "secondary" : "ghost"}
            className={cn("w-full justify-start", route.active ? "bg-secondary" : "")}
            asChild
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-5 w-5" />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
