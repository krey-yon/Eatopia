"use client";

import { useState, useEffect, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Clock,
  MapPin,
  Heart,
  Plus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OrderModal } from "@/components/order-modal";
import { MenuItemsType, RestaurantInfoProps } from "@/lib/definitions";
import { fetchRestaurantMenu, restaurantInfo } from "@/actions/restaurant";
import { addOrder } from "@/actions/order";

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

export default function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [restaurant, setRestaurant] = useState<RestaurantInfoProps | null>(
    null
  );
  const [restaurantMenu, setRestaurantMenu] = useState<MenuItemsType[] | null>(
    null
  );
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log(orderId, orderPlaced);

  const { id } = use(params);

  // Generate stable values using restaurant ID as seed
  const restaurantData = useMemo(() => {
    if (!id) return { deliveryTime: 35, rating: "4.5" };

    const seed = id;
    const random1 = seededRandom(seed + "delivery");
    const random2 = seededRandom(seed + "rating");

    return {
      deliveryTime: Math.floor(random1 * (50 - 40) + 40),
      rating: (random2 * (5.0 - 4.0) + 4.0).toFixed(1),
    };
  }, [id]);

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
    fetchMenuItemsInfo();
  }, [id]);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading restaurant...</p>
        </div>
      </div>
    );
  }

  const handleAddToOrder = (itemId: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev;
      }
      return [...prev, itemId];
    });
  };

  const handlePlaceOrder = async (address: string) => {
    const selectedMenuItems = selectedItems
      .map((id) => restaurantMenu?.find((item) => item.id === id))
      .filter(Boolean);

    if (selectedMenuItems.length === 0) {
      return;
    }

    const orderData = {
      userId: restaurant.ownerId,
      restaurantId: restaurant.id,
      address,
      itemDetails: {
        name: selectedMenuItems[0]!.name,
        price: selectedMenuItems[0]!.price,
      },
    };

    const order = await addOrder(orderData);
    setOrderId(order?.id || null);
    setOrderPlaced(true);
    setOrderModalOpen(false);
  };

  const totalPrice = selectedItems.reduce((sum, itemId) => {
    const item = restaurantMenu?.find((item) => item.id === itemId);
    return sum + (item?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/dashboard" className="mr-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">
                {restaurant.name}
              </h1>
            </div>

            {selectedItems.length > 0 && (
              <Button
                onClick={() => setOrderModalOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Order ({selectedItems.length}) • ${totalPrice.toFixed(2)}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Restaurant Hero Section */}
        <div className="relative mb-8">
          <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={restaurant.imageUrl || "/placeholder.svg"}
              alt={restaurant.name}
              fill
              className={`object-cover transition-all duration-700 ${
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
              }`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold drop-shadow-lg">
                    {restaurant.name}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-colors">
                      🍴 {restaurant.cuisine}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {restaurantData.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <Heart
                    className={`h-6 w-6 transition-all duration-300 ${
                      isLiked
                        ? "fill-red-500 text-red-500 scale-110"
                        : "text-white hover:text-red-400"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Floating info cards */}
            <div className="absolute top-6 right-6 space-y-3">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-gray-700">
                    {restaurantData.deliveryTime} min
                  </span>
                </div>
              </div>

              <div className="bg-green-500 text-white rounded-xl px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="font-medium">Open Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Delivery Time</p>
                <p className="text-gray-600">
                  {restaurantData.deliveryTime} minutes
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Rating</p>
                <p className="text-gray-600">
                  {restaurantData.rating} ⭐ (200+ reviews)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Location</p>
                <p className="text-gray-600 line-clamp-1">
                  {restaurant.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-gray-800">Our Menu</h2>
            <p className="text-gray-600">Discover our delicious offerings</p>
          </div>

          {selectedItems.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2">
              <p className="text-sm text-orange-700">
                {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""}{" "}
                selected
              </p>
            </div>
          )}
        </div>

        <Separator className="mb-8 bg-gradient-to-r from-orange-200 to-red-200 h-0.5" />

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantMenu?.map((item, index) => {
            const isSelected = selectedItems.includes(item.id);

            return (
              <Card
                key={item.id}
                className={`overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 shadow-lg group ${
                  isSelected ? "ring-2 ring-orange-500 shadow-orange-200" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Price badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                    <span className="font-bold text-gray-800">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Selected overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                      <div className="bg-orange-500 rounded-full p-2">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      Fresh and delicious {item.name.toLowerCase()} made with
                      premium ingredients
                    </p>
                  </div>

                  <Button
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                        : "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300"
                    }`}
                    onClick={() => handleAddToOrder(item.id)}
                  >
                    {isSelected ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Added to Order
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Order
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty state for menu */}
        {restaurantMenu?.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Menu Coming Soon
            </h3>
            <p className="text-gray-600">
              This restaurant is still setting up their menu. Check back later!
            </p>
          </div>
        )}
      </div>

      {/* Floating Order Button for Mobile */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 md:hidden z-50">
          <Button
            onClick={() => setOrderModalOpen(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-2xl py-4 text-lg font-semibold animate-pulse"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Order {selectedItems.length} item
            {selectedItems.length > 1 ? "s" : ""} • ${totalPrice.toFixed(2)}
          </Button>
        </div>
      )}

      <OrderModal
        open={orderModalOpen}
        onOpenChange={setOrderModalOpen}
        selectedItems={selectedItems
          .map((id) => restaurantMenu?.find((item) => item.id === id))
          .filter((item): item is MenuItemsType => item !== undefined)}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}
