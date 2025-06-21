"use client";

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
} from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { logoutActions } from "@/actions";

export function DashboardSidebar({
  restaurantId,
  children,
}: {
  restaurantId: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const routes = [
    {
      href: `/dashboard/restaurant/${restaurantId}/orders`,
      label: "Orders",
      icon: ClipboardList,
      active: pathname?.includes(
        `/dashboard/restaurant/${restaurantId}/orders`
      )
    },
    {
      href: `/dashboard/restaurant/${restaurantId}/menu`,
      label: "Menu",
      icon: Menu,
      active: pathname?.includes(`/dashboard/restaurant/${restaurantId}/menu`),
    },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutActions();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div
        className={cn(
          "flex flex-col bg-white shadow-xl border-r border-orange-200 transition-all duration-300 relative",
          collapsed ? "w-20" : "w-72"
        )}
      >
        {/* Header Section */}
        <div className="flex h-20 items-center gap-4 justify-between border-b border-orange-100 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          {!collapsed && (
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
          {collapsed && (
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
            className="h-10 w-10 p-0 bg-amber-200 hover:bg-white/20 text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="text-black h-5 w-5 transition-transform duration-300" />
            ) : (
              <ChevronLeft className="text-black h-5 w-5 transition-transform duration-300" />
            )}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>

        {/* Profile Section */}
        {!collapsed && (
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
                  collapsed ? "px-3" : "px-4",
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
                        !collapsed && "mr-3",
                        route.active
                          ? "text-orange-600"
                          : "text-gray-600 group-hover:text-orange-600"
                      )}
                    />
                    {!collapsed && (
                      <span className="font-medium flex-1">{route.label}</span>
                    )}
                    {/* {!collapsed && route.badge && (
                      <Badge
                        className={cn(
                          "text-xs text-white ml-auto animate-pulse",
                          route.badgeColor || "bg-orange-500"
                        )}
                      >
                        {route.badge}
                      </Badge>
                    )} */}
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
              collapsed ? "px-3" : "px-4"
            )}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut
              className={cn(
                "h-5 w-5 transition-transform",
                !collapsed && "mr-3",
                isLoggingOut && "animate-spin"
              )}
            />
            {!collapsed && (
              <span className="font-medium">
                {isLoggingOut ? "Signing Out..." : "Sign Out"}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
