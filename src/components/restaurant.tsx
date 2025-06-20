import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, Heart } from "lucide-react";
import { useState, useMemo } from "react";

interface RestaurantProps {
  restaurant: {
    id: string;
    name: string;
    cuisine: string;
    imageUrl: string;
    address?: string;
  };
}

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

export function Restaurant({ restaurant }: RestaurantProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate stable values using restaurant ID as seed
  const restaurantData = useMemo(() => {
    const seed = restaurant.id;
    const random1 = seededRandom(seed + "rating");
    const random2 = seededRandom(seed + "delivery");
    const random3 = seededRandom(seed + "fee");
    const random4 = seededRandom(seed + "promoted");
    const random5 = seededRandom(seed + "popular");

    return {
      rating: (random1 * (5.0 - 4.0) + 4.0).toFixed(1),
      deliveryTime: Math.floor(random2 * (50 - 40) + 40),
      deliveryFee: random3 > 0.3 ? `$${(random3 * 3 + 1).toFixed(2)}` : "Free",
      isPromoted: random4 > 0.7,
      isPopular: random5 > 0.5,
    };
  }, [restaurant.id]);

  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group border-0 shadow-lg bg-white">
      <div className="relative h-48 w-full overflow-hidden">
        {/* Promotional Badge */}
        {restaurantData.isPromoted && (
          <div className="absolute top-3 left-3 z-20">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg animate-pulse">
              ⚡ Featured
            </Badge>
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300 shadow-lg hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${
              isLiked
                ? "fill-red-500 text-red-500 scale-110"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        {/* Image with overlay effects */}
        <div className="relative w-full h-full">
          <Image
            src={restaurant?.imageUrl || "/placeholder.svg"}
            alt={restaurant?.name}
            fill
            className={`object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Delivery info overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3 text-green-600" />
                <span className="font-medium text-gray-700">
                  {restaurantData.deliveryTime} min
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span
                  className={`font-medium ${restaurantData.deliveryFee === "Free" ? "text-green-600" : "text-gray-700"}`}
                >
                  {restaurantData.deliveryFee === "Free"
                    ? "🚚 Free delivery"
                    : `Delivery ${restaurantData.deliveryFee}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Restaurant name and rating */}
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
            {restaurant?.name}
          </h2>
          <div className="flex items-center bg-green-50 px-2 py-1 rounded-full shrink-0 ml-2">
            <Star className="h-3 w-3 fill-green-500 text-green-500 mr-1" />
            <span className="text-sm font-bold text-green-700">
              {restaurantData.rating}
            </span>
          </div>
        </div>

        {/* Cuisine badge with enhanced styling */}
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 text-orange-700 hover:from-orange-100 hover:to-red-100 transition-all duration-300 font-medium"
          >
            🍴 {restaurant?.cuisine}
          </Badge>

          {/* Quick stats */}
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Open</span>
            </div>
          </div>
        </div>

        {/* Address if available */}
        {restaurant?.address && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="line-clamp-1">{restaurant.address}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="h-4 w-4 text-orange-500" />
            <span>{restaurantData.deliveryTime} min delivery</span>
          </div>

          {/* Additional info */}
          <div className="flex items-center space-x-2">
            {restaurantData.isPopular && (
              <Badge
                variant="secondary"
                className="text-xs bg-blue-50 text-blue-700 border-blue-200"
              >
                Popular
              </Badge>
            )}
          </div>
        </div>
      </CardFooter>

      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-200 rounded-lg transition-all duration-300 pointer-events-none" />
    </Card>
  );
}
