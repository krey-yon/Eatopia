"use client";
import { useLogin } from "@/hooks/useLogin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormGenerator from "@/components/form-generator";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users, Building2, Bike, Sparkles } from "lucide-react";

const Page = () => {
  const { errors, onFormSubmit, register } = useLogin();

  const handleGuestLogin = (email: string, password: string) => {
    // Find and set the input values directly
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const passwordInput = document.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    if (emailInput && passwordInput) {
      emailInput.value = email;
      passwordInput.value = password;

      // Trigger change events to update form state
      emailInput.dispatchEvent(new Event("input", { bubbles: true }));
      passwordInput.dispatchEvent(new Event("input", { bubbles: true }));

      // Submit the form
      const form = document.querySelector("form");
      if (form) {
        form.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true })
        );
      }
    }
  };

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

      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-8 animate-fade-in-left">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🍽️</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Eatopia
              </h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 leading-tight">
              Delicious food delivered to your doorstep
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of food lovers and discover amazing restaurants in
              your area
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">🚀</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Fast Delivery</p>
                <p className="text-sm text-gray-600">30 minutes or less</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">⭐</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Top Restaurants</p>
                <p className="text-sm text-gray-600">Only the best quality</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600">💰</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Best Prices</p>
                <p className="text-sm text-gray-600">Great deals every day</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto animate-fade-in-right">
          <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-2xl">🍽️</span>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Sign in to continue your culinary journey
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={onFormSubmit} className="space-y-5">
                <div className="space-y-4">
                  <FormGenerator
                    inputType={"input"}
                    register={register}
                    name={"email"}
                    errors={errors}
                    placeholder={"Enter your email"}
                    type={"email"}
                    label={"Email"}
                  />
                  <FormGenerator
                    inputType={"input"}
                    register={register}
                    name={"password"}
                    errors={errors}
                    placeholder={"Enter your password"}
                    type={"password"}
                    label={"Password"}
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </form>

              {/* Separator */}
              <div className="relative">
                <Separator className="bg-gray-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500 font-medium">
                    Or try as guest
                  </span>
                </div>
              </div>

              {/* Guest Login Buttons */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Quick Demo Access
                  </p>
                  <p className="text-xs text-gray-500">
                    Try different user experiences
                  </p>
                </div>

                <div className="grid gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-left border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group p-4 h-auto"
                    onClick={() =>
                      handleGuestLogin("user@mail.com", "pass@!23")
                    }
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-gray-800 text-sm">
                          Guest User
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Explore as a customer
                        </p>
                      </div>
                    </div>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-left border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-300 group p-4 h-auto"
                    onClick={() =>
                      handleGuestLogin("restaurant@mail.com", "pass@123")
                    }
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-gray-800 text-sm">
                          Restaurant Owner
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Manage your restaurant
                        </p>
                      </div>
                    </div>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-left border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 group p-4 h-auto"
                    onClick={() =>
                      handleGuestLogin("rider@mail.com", "pass@123")
                    }
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                        <Bike className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-gray-800 text-sm">
                          Delivery Rider
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Handle deliveries
                        </p>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-4">
                <p className="text-xs text-gray-500">
                  🔒 Your data is secure and encrypted
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
