"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQueryData } from "@/hooks/useQueryData";
import { fetchMenus } from "@/actions";
import { MenuProps } from "@/lib/definitions";
import { MenuItemForm } from "@/components/menu-item-form";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  Menu,
  Store,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  User,
  Loader2,
  ChefHat,
  Utensils,
  // DollarSign,
  Package,
  DollarSign,
} from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function MenuItemsList({ restaurantId }: { restaurantId: string }) {
  const { data, isFetching } = useQueryData(["restaurant-menu"], () =>
    fetchMenus(restaurantId)
  );

  const menus = data as MenuProps[];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardContent className="pt-16 pb-16 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
              <p className="text-lg text-gray-600">
                Loading your delicious menu...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {menus.length ? (
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100 pb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Menu Items
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1">
                      Your current menu offerings • {menus[0].menuItems.length}{" "}
                      items
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    variant="outline"
                    className="px-3 py-1 bg-green-100 text-green-700 border-green-300"
                  >
                    <Package className="w-3 h-3 mr-1" />
                    {menus[0].menuItems.length} Items
                  </Badge>
                  <MenuItemForm menuId={menus[0].id} />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {menus[0].menuItems.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {menus[0].menuItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative h-32 w-full overflow-hidden rounded-lg mb-4">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                          {item.name}
                        </h3>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-xl font-bold text-green-600">
                              {formatPrice(item.price)}
                            </span>
                          </div>

                          <Badge
                            variant="outline"
                            className="bg-orange-50 text-orange-700 border-orange-200"
                          >
                            Available
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Utensils className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No menu items yet
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                    Start building your menu by adding your first delicious item
                  </p>
                  <MenuItemForm menuId={menus[0].id} />
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg border-0">
            <CardContent className="pt-16 pb-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ChefHat className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Menu Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You need to create a menu first before adding items. Create your
                menu to get started!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export function DashboardSidebar({
  restaurantId,
  children,
}: {
  restaurantId: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const routes = [
    {
      href: `/dashboard/restaurant/${restaurantId}/orders`,
      label: "Orders",
      icon: ClipboardList,
      active: pathname?.includes(
        `/dashboard/restaurant/${restaurantId}/orders`
      ),
      badge: "3", // New orders count
      badgeColor: "bg-red-500",
    },
    {
      href: `/dashboard/restaurant/${restaurantId}/menu`,
      label: "Menu",
      icon: Menu,
      active: pathname?.includes(`/dashboard/restaurant/${restaurantId}/menu`),
    },
  ];

  // Determine if sidebar should show expanded content
  const showExpanded = !collapsed || isHovered;

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div
        className={cn(
          "flex flex-col bg-white shadow-xl border-r border-orange-200 transition-all duration-300 relative z-50",
          collapsed && !isHovered ? "w-20" : "w-72"
        )}
        onMouseEnter={() => collapsed && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header Section */}
        <div className="flex h-20 items-center justify-between border-b border-orange-100 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          {showExpanded && (
            <Link
              href="/dashboard/restaurant"
              className="flex items-center gap-3 font-bold hover:scale-105 transition-transform"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Store className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Restaurant</span>
                <span className="text-xs opacity-90">Dashboard</span>
              </div>
            </Link>
          )}
          {!showExpanded && (
            <Link
              href="/dashboard/restaurant"
              className="mx-auto hover:scale-110 transition-transform"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Store className="h-7 w-7" />
              </div>
            </Link>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 hover:bg-white/20 text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5 transition-transform duration-300" />
            ) : (
              <ChevronLeft className="h-5 w-5 transition-transform duration-300" />
            )}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>

        {/* Profile Section */}
        {showExpanded && (
          <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  Restaurant Owner
                </p>
                <p className="text-xs text-gray-600 truncate">
                  ID: {restaurantId.slice(0, 8)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-orange-100"
              >
                <Bell className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-2 px-3">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-12 transition-all duration-200 group relative",
                  collapsed && !isHovered ? "px-3" : "px-4",
                  route.active
                    ? "bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200 shadow-sm"
                    : "hover:bg-orange-50 hover:text-orange-600"
                )}
                asChild
              >
                <Link href={route.href}>
                  <div className="flex items-center w-full">
                    <route.icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        showExpanded && "mr-3",
                        route.active
                          ? "text-orange-600"
                          : "text-gray-600 group-hover:text-orange-600"
                      )}
                    />
                    {showExpanded && (
                      <span className="font-medium flex-1">{route.label}</span>
                    )}
                    {showExpanded && route.badge && (
                      <Badge
                        className={cn(
                          "text-xs text-white ml-auto animate-pulse",
                          route.badgeColor || "bg-orange-500"
                        )}
                      >
                        {route.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Active indicator */}
                  {route.active && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-red-500 rounded-r-full" />
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-orange-100 p-3">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-12 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors",
              collapsed && !isHovered ? "px-3" : "px-4"
            )}
          >
            <LogOut className={cn("h-5 w-5", showExpanded && "mr-3")} />
            {showExpanded && <span className="font-medium">Sign Out</span>}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
