"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Restaurant } from "@/components/restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, Filter, Star, MapPin, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/use-debounce";
import { allRestaurantData } from "@/actions/restaurant";

type SortOption = "a-z" | "z-a" | "random";

export default function Home() {
  // State definitions
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("a-z");
  const [restaurant, setRestaurant] = useState<
    {
      id: string;
      name: string;
      address: string;
      imageUrl: string | null;
      cuisine: string;
      ownerId: string;
    }[]
  >([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurant);
  const [isLoading, setIsLoading] = useState(true);

  // Using the useDebounce hook for the search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // First useEffect - Fetching data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await allRestaurantData();
      console.log("Fetched data:", data);
      setRestaurant(data || []);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Second useEffect - Filtering and sorting
  useEffect(() => {
    let results = [...restaurant];

    if (debouncedSearchTerm) {
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          item.cuisine.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "a-z":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "random":
        results.sort(() => Math.random() - 0.5);
        break;
    }

    setFilteredRestaurants(results);
  }, [debouncedSearchTerm, sortBy, restaurant]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 text-white mb-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold animate-fade-in-up">
              🍽️ Discover Amazing Food
            </h1>
            <p className="text-xl md:text-2xl opacity-90 animate-fade-in-up animation-delay-200">
              Order from the best restaurants in your area
            </p>
            <div className="flex justify-center items-center gap-2 text-sm opacity-80 animate-fade-in-up animation-delay-400">
              <Clock className="h-4 w-4" />
              <span>Fast delivery • Fresh food • Great taste</span>
            </div>
          </div>
        </div>
        {/* Decorative waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-12 fill-orange-50"
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 -mt-8 relative z-10">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {restaurant.length}+
                </h3>
                <p className="text-gray-600">Top Restaurants</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">30 min</h3>
                <p className="text-gray-600">Average Delivery</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">5+ km</h3>
                <p className="text-gray-600">Coverage Area</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header with My Orders */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">
              Browse Restaurants
            </h2>
            <p className="text-gray-600">Find your next favorite meal</p>
          </div>
          <Link href="/dashboard/user/orders">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <ShoppingBag className="mr-2 h-4 w-4" />
              My Orders
            </Button>
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search restaurants, cuisines, or dishes..."
                className="pl-12 h-12 border-2 border-gray-200 focus:border-orange-500 transition-colors duration-300 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 px-6 border-2 border-gray-200 hover:border-orange-500 transition-all duration-300 rounded-xl"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Sort: {getSortLabel(sortBy)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => setSortBy("a-z")}
                  className="hover:bg-orange-50 cursor-pointer"
                >
                  Name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("z-a")}
                  className="hover:bg-orange-50 cursor-pointer"
                >
                  Name (Z-A)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("random")}
                  className="hover:bg-orange-50 cursor-pointer"
                >
                  Surprise Me!
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-64 mb-4"></div>
                <div className="bg-gray-200 rounded h-4 mb-2"></div>
                <div className="bg-gray-200 rounded h-4 w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredRestaurants?.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse all restaurants.
            </p>
            <Button
              onClick={() => setSearchTerm("")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants?.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="animate-fade-in-up hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/dashboard/user/restaurant/${restaurant.id}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                    <Restaurant
                      restaurant={{
                        ...restaurant,
                        imageUrl: restaurant.imageUrl || "/default-image.jpg",
                      }}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getSortLabel(sortBy: SortOption): string {
  switch (sortBy) {
    case "a-z":
      return "A-Z";
    case "z-a":
      return "Z-A";
    case "random":
      return "Random";
    default:
      return "Default";
  }
}
