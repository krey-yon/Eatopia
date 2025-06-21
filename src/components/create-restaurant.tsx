"use client";

import React from "react";
import { useRestaurantForm } from "@/hooks/useRestaurantForm";
import FormGenerator from "@/components/form-generator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Store,
  Sparkles,
  ChefHat,
} from "lucide-react";

const CreateRestaurant = () => {
  const { errors, onFormSubmit, register } = useRestaurantForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Floating food icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-20 text-4xl animate-bounce opacity-20"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        >
          🍽️
        </div>
        <div
          className="absolute top-40 right-32 text-3xl animate-bounce opacity-20"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        >
          👨‍🍳
        </div>
        <div
          className="absolute bottom-32 left-32 text-3xl animate-bounce opacity-20"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        >
          🏪
        </div>
        <div
          className="absolute bottom-20 right-20 text-4xl animate-bounce opacity-20"
          style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}
        >
          📋
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Branding & Benefits */}
        <div className="hidden lg:block space-y-8 animate-fade-in-left">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Launch Your
                </h1>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Restaurant
                </h2>
                <p className="text-lg text-gray-600 mt-2">
                  Join thousands of successful restaurants
                </p>
              </div>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed">
              Transform your culinary passion into a thriving business. Set up
              your restaurant profile and start accepting orders today!
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  Professional Kitchen
                </p>
                <p className="text-sm text-gray-600">
                  Showcase your culinary expertise
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Easy Management</p>
                <p className="text-sm text-gray-600">
                  Simple dashboard to manage orders
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  Instant Visibility
                </p>
                <p className="text-sm text-gray-600">
                  Reach customers immediately
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-6 pt-6">
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-sm text-gray-600">Active Restaurants</div>
            </div>
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                $2M+
              </div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </div>
          </div> */}
        </div>

        {/* Right side - Create Restaurant Form */}
        <div className="w-full max-w-lg mx-auto animate-fade-in-right">
          <Card className="backdrop-blur-xl bg-white/95 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
            {/* Card Header */}
            <CardHeader className="text-center space-y-6 pb-8 bg-gradient-to-br from-orange-50 to-red-50 border-b border-orange-100">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl animate-bounce">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Create Restaurant
                </CardTitle>
                <CardDescription className="text-gray-600 text-base max-w-sm mx-auto">
                  Fill in your restaurant details below to get started on your
                  culinary journey
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-6 py-8">
              <form onSubmit={onFormSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div className="relative">
                    <div className="absolute left-3 top-9 text-orange-500">
                      {/* <Store className="w-4 h-4" /> */}
                    </div>
                    <div className="pl-6">
                      <FormGenerator
                        inputType={"input"}
                        register={register}
                        name={"name"}
                        errors={errors}
                        placeholder={"Enter your restaurant name"}
                        type={"text"}
                        label={"Restaurant Name"}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-3 top-9 text-orange-500">
                      {/* <MapPin className="w-4 h-4" /> */}
                    </div>
                    <div className="pl-6">
                      <FormGenerator
                        inputType={"input"}
                        register={register}
                        name={"address"}
                        errors={errors}
                        placeholder={"Enter your restaurant address"}
                        type={"text"}
                        label={"Address"}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-3 top-9 text-orange-500">
                      {/* <Utensils className="w-4 h-4" /> */}
                    </div>
                    <div className="pl-6">
                      <FormGenerator
                        inputType={"input"}
                        register={register}
                        name={"cuisine"}
                        errors={errors}
                        placeholder={"e.g., Italian, Chinese, Indian"}
                        type={"text"}
                        label={"Cuisine Type"}
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-3 top-9 text-orange-500">
                      {/* <ImageIcon className="w-4 h-4" /> */}
                    </div>
                    <div className="pl-6">
                      <FormGenerator
                        inputType={"input"}
                        register={register}
                        name={"imageUrl"}
                        errors={errors}
                        placeholder={"Upload restaurant image URL"}
                        type={"text"}
                        label={"Restaurant Image"}
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-8">
                  <Store className="w-5 h-5 mr-2" />
                  Create My Restaurant
                </Button>

                {/* Footer */}
                <div className="text-center pt-4 space-y-2">
                  <p className="text-xs text-gray-500">
                    🔒 Your restaurant information is secure and encrypted
                  </p>
                  <p className="text-xs text-gray-500">
                    Need help?{" "}
                    <span className="text-orange-600 font-medium cursor-pointer hover:underline">
                      Contact support
                    </span>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;
