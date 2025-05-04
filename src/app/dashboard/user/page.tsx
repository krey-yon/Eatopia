"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Restaurant } from "@/components/restaurant"
// import { restaurants } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingBag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDebounce } from "@/hooks/use-debounce"
import { allRestaurantData } from "@/actions/restaurant"

type SortOption = "a-z" | "z-a" | "random"

export default function Home() {


// First useEffect - Fetching data
useEffect(() => {
  const fetchData = async () => {
    const data = await allRestaurantData();
    console.log("Fetched data:", data);
    setRestaurant(data || []);
  };

  fetchData();
}, []);

// State definitions
const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState<SortOption>("a-z");
const [restaurant, setRestaurant] = useState<{ 
  id: string; 
  name: string; 
  address: string; 
  imageUrl: string | null; 
  cuisine: string; 
  ownerId: string; 
}[]>([]);
const [filteredRestaurants, setFilteredRestaurants] = useState(restaurant)


// Using the useDebounce hook for the search term
const debouncedSearchTerm = useDebounce(searchTerm, 300);

// Second useEffect - Filtering and sorting
useEffect(() => {
  // Create a copy of the restaurant array to avoid modifying state directly
  let results = [...restaurant];
  
  // Filter by search term if it exists
  if (debouncedSearchTerm) {
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.cuisine.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }
  
  // Sort the results
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
  
  // Update filtered restaurants
  setFilteredRestaurants(results);
  
}, [debouncedSearchTerm, sortBy, restaurant]); // Added restaurant as dependency

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
        <div className="flex items-center gap-2 self-end md:self-auto">
          <Link href="/dashboard/user/orders">
            <Button variant="outline" size="sm">
              <ShoppingBag className="mr-2 h-4 w-4" />
              My Orders
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search restaurants or cuisines..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Sort by: {getSortLabel(sortBy)}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy("a-z")}>Name (A-Z)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("z-a")}>Name (Z-A)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("random")}>Randomly</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {filteredRestaurants?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No restaurants found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants?.map((restaurant) => (
            <Link key={restaurant.id} href={`/dashboard/user/restaurant/${restaurant.id}`}>
              <Restaurant restaurant={{ ...restaurant, imageUrl: restaurant.imageUrl || "/default-image.jpg" }} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function getSortLabel(sortBy: SortOption): string {
  switch (sortBy) {
    case "a-z":
      return "Name (A-Z)"
    case "z-a":
      return "Name (Z-A)"
    case "random":
      return "Rating randomly"
    default:
      return "Rating (High to Low)"
  }
}
