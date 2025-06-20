"use client";
import { useSignup } from "@/hooks/useSignup";
import FormGenerator from "@/components/form-generator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Sparkles, CheckCircle } from "lucide-react";

const Page = () => {
  const { control, errors, onFormSubmit, register } = useSignup();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-red-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating food icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-20 text-4xl animate-bounce opacity-30"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        >
          🍕
        </div>
        <div
          className="absolute top-40 right-32 text-3xl animate-bounce opacity-30"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        >
          🍔
        </div>
        <div
          className="absolute bottom-32 left-32 text-3xl animate-bounce opacity-30"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        >
          🍜
        </div>
        <div
          className="absolute bottom-20 right-20 text-4xl animate-bounce opacity-30"
          style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}
        >
          🥗
        </div>
        <div
          className="absolute top-1/3 left-10 text-2xl animate-bounce opacity-30"
          style={{ animationDelay: "0.5s", animationDuration: "3.8s" }}
        >
          🍰
        </div>
        <div
          className="absolute top-2/3 right-10 text-2xl animate-bounce opacity-30"
          style={{ animationDelay: "2.5s", animationDuration: "3.2s" }}
        >
          🍣
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-8 animate-fade-in-left">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl">
                <span className="text-3xl">🍽️</span>
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Join Eatopia
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Your culinary adventure begins here
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 leading-tight">
              Become part of our food-loving community
            </h2>
            <p className="text-lg text-gray-600">
              Whether you&apos;re a food enthusiast, restaurant owner, or delivery
              partner - we have the perfect role for you!
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Easy Registration</p>
                <p className="text-sm text-gray-600">
                  Quick and simple signup process
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Multiple Roles</p>
                <p className="text-sm text-gray-600">
                  Customer, Restaurant, or Rider
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Instant Access</p>
                <p className="text-sm text-gray-600">
                  Start using immediately after signup
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-6 pt-6">
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </div>
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-sm text-gray-600">Restaurants</div>
            </div>
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                50K+
              </div>
              <div className="text-sm text-gray-600">Orders</div>
            </div>
          </div> */}
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full max-w-lg mx-auto animate-fade-in-right">
          <Card className="backdrop-blur-xl bg-white/95 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
            {/* Card Header with enhanced styling */}
            <CardHeader className="text-center space-y-6 pb-8 bg-gradient-to-br from-orange-50 to-red-50 border-b border-orange-100">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl animate-bounce">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Create Account
                </CardTitle>
                <CardDescription className="text-gray-600 text-base max-w-sm mx-auto">
                  Fill in your details below to join our amazing food community
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-6 py-8">
              <form onSubmit={onFormSubmit} className="flex flex-col gap-y-5">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <FormGenerator
                      inputType={"input"}
                      register={register}
                      name={"email"}
                      errors={errors}
                      placeholder={"Enter your email"}
                      type={"email"}
                      label={"Email Address"}
                    />
                  </div>

                  <div className="space-y-1">
                    <FormGenerator
                      inputType={"input"}
                      register={register}
                      name={"password"}
                      errors={errors}
                      placeholder={"Create a strong password"}
                      type={"password"}
                      label={"Password"}
                    />
                  </div>

                  <div className="space-y-1">
                    <FormGenerator
                      inputType={"input"}
                      register={register}
                      name={"name"}
                      errors={errors}
                      placeholder={"Your full name"}
                      type={"text"}
                      label={"Full Name"}
                    />
                  </div>

                  <div className="space-y-1">
                    <FormGenerator
                      inputType={"input"}
                      register={register}
                      name={"address"}
                      errors={errors}
                      placeholder={"Your address"}
                      type={"text"}
                      label={"Address"}
                    />
                  </div>

                  <div className="space-y-1">
                    <FormGenerator
                      control={control}
                      inputType={"select"}
                      register={register}
                      name={"role"}
                      errors={errors}
                      placeholder={""}
                      label={"Choose Your Role"}
                    />
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-6">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create My Account
                </Button>

                {/* Footer */}
                <div className="text-center pt-4 space-y-2">
                  <p className="text-xs text-gray-500">
                    🔒 Your information is secure and encrypted
                  </p>
                  <p className="text-xs text-gray-500">
                    Already have an account?{" "}
                    <span className="text-orange-600 font-medium cursor-pointer hover:underline">
                      Sign in here
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

export default Page;
