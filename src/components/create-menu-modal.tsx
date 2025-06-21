"use client";
import { Button } from "@/components/ui/button";
import { createMenu } from "@/app/dashboard/restaurant/action";
import { useMutationData } from "@/hooks/useMutationData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChefHat, Plus, Loader2 } from "lucide-react";

export function CreateMenuModal({ restaurantId }: { restaurantId: string }) {
  const { isPending, mutate } = useMutationData(
    ["create-menu"],
    () => createMenu(restaurantId),
    "restaurant-menu"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg border-0 rounded-xl">
        <CardHeader className="text-center pb-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-t-xl border-b border-orange-100">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-md mb-4">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Create Restaurant Menu
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Set up your menu to start adding delicious items for your customers
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <span className="text-orange-700 text-sm font-bold">ℹ️</span>
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  This will create a new menu for your restaurant
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Restaurant ID:{" "}
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {restaurantId.slice(0, 8)}...
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Add unlimited menu items</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Organize items by categories</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Start accepting orders immediately</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button
            onClick={mutate}
            disabled={isPending}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Menu...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create Menu
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
