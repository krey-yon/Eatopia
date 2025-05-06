import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
// import { restaurantInfo } from "@/actions/restaurant"

interface RestaurantProps {
  restaurant: {
    id: string;
    name: string;
    cuisine: string;
    imageUrl: string;
  };
}

export function Restaurant({ restaurant }: RestaurantProps) {
  // const restaurant = await restaurantInfo(restaurantId);
  const restaurantRating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
  const diliveryTime = Math.floor(Math.random() * (50 - 40) + 40) + " Min";

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={restaurant?.imageUrl || "/placeholder.svg"}
          alt={restaurant?.name!}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{restaurant?.name}</h2>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{restaurantRating}</span>
          </div>
        </div>
        <Badge variant="outline" className="mt-2">
          {restaurant?.cuisine}
        </Badge>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
        {diliveryTime} delivery time
      </CardFooter>
    </Card>
  );
}
