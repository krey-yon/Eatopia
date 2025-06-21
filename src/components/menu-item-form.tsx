"use client";

import type React from "react";
import {
  Plus,
  ChefHat,
  DollarSign,
  ImageIcon,
  Loader2,
  Utensils,
} from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAddMenuItem } from "@/hooks/useAddMenuItem";
import FormGenerator from "./form-generator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MenuItemForm({ menuId }: { menuId: string }) {
  console.log(menuId);
  const { errors, onFormSubmit, register, isPending } = useAddMenuItem();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md mx-auto bg-white border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg mb-4">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Add New Menu Item
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Create a delicious new item for your customers to enjoy
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <form onSubmit={onFormSubmit} className="space-y-5">
            {/* Item Name */}
            <div className="relative">
              <div className="absolute left-3 top-9 text-orange-500">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="pl-10">
                <FormGenerator
                  inputType={"input"}
                  register={register}
                  name={"name"}
                  errors={errors}
                  placeholder={"e.g., Margherita Pizza"}
                  type={"text"}
                  label={"Item Name"}
                />
              </div>
            </div>

            {/* Price */}
            <div className="relative">
              <div className="absolute left-3 top-9 text-green-500">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="pl-10">
                <FormGenerator
                  inputType={"input"}
                  register={register}
                  name={"price"}
                  errors={errors}
                  placeholder={"e.g., 5$"}
                  type={"number"}
                  label={"Price (in dollars)"}
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="relative">
              <div className="absolute left-3 top-9 text-blue-500">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div className="pl-10">
                <FormGenerator
                  inputType={"input"}
                  register={register}
                  name={"imageUrl"}
                  errors={errors}
                  placeholder={"https://example.com/image.jpg"}
                  type={"text"}
                  label={"Image URL"}
                />
              </div>
            </div>

            {/* Description (Optional) */}
            <div className="relative">
              <div className="absolute left-3 top-9 text-purple-500">
                <ChefHat className="w-4 h-4" />
              </div>
              <div className="pl-10">
                <FormGenerator
                  inputType={"textarea"}
                  register={register}
                  name={"description"}
                  errors={errors}
                  placeholder={"Describe your delicious item..."}
                  label={"Description (Optional)"}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-6"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding Item...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Menu Item
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
