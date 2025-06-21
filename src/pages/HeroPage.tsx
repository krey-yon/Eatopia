import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import { User } from "@prisma/client";
import {
  ArrowRight,
  Star,
  Clock,
  Shield,
  Users,
  ChefHat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroPage = ({ user }: { user: User | null }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-sm px-3 py-1">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  #1 Food Delivery App
                </Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-sm px-3 py-1">
                  🚀 Fast & Fresh
                </Badge>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gray-900">Delicious</span>
                  <br />
                  <span className="FascinateInline bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Meals
                  </span>
                  <br />
                  <span className="text-gray-900">Delivered</span>
                </h1>

                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Experience the finest food delivery service with fresh
                  ingredients, expert chefs, and lightning-fast delivery to your
                  doorstep.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Order Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold px-8 py-4 text-lg transition-all duration-300"
                >
                  Explore Menu
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Restaurants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">15min</div>
                  <div className="text-sm text-gray-600">Avg Delivery</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/image/eatopia-hero-image.png"
                  height={600}
                  width={800}
                  alt="Delicious food delivery"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-lg animate-bounce">
                <div className="text-2xl">🍕</div>
              </div>
              <div
                className="absolute -bottom-6 -left-6 bg-white rounded-full p-4 shadow-lg animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="text-2xl">🍔</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose{" "}
              <span className="FascinateInline text-orange-500">Eatopia</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re committed to delivering not just food, but an exceptional
              experience that keeps you coming back for more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Average delivery time of just 15 minutes to your door
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Expert Chefs
              </h3>
              <p className="text-gray-600">
                Partnered with top restaurants and skilled chefs
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Safe & Secure
              </h3>
              <p className="text-gray-600">
                Contactless delivery with hygiene protocols
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Round-the-clock customer service and assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It{" "}
              <span className="FascinateInline text-orange-500">Works</span>
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get your favorite meals delivered
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Choose Your Meal
              </h3>
              <p className="text-gray-600 text-lg">
                Browse through hundreds of restaurants and thousands of dishes
              </p>
              <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2">
                <ArrowRight className="w-6 h-6 text-orange-500" />
              </div>
            </div>

            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Place Your Order
              </h3>
              <p className="text-gray-600 text-lg">
                Quick and secure checkout with multiple payment options
              </p>
              <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2">
                <ArrowRight className="w-6 h-6 text-blue-500" />
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Enjoy Your Meal
              </h3>
              <p className="text-gray-600 text-lg">
                Fresh, hot meals delivered right to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Satisfy Your{" "}
            <span className="FascinateInline">Cravings</span>?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust Eatopia for their
            daily meals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-4 text-lg transition-all duration-300"
            >
              Download App
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">🍴</span>
                  </div>
                  <h3 className="text-3xl font-bold FascinateInline bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Eatopia
                  </h3>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  Your favorite food delivery app bringing delicious meals from the best restaurants 
                  directly to your door. Fast, fresh, and always satisfying.
                </p>

                {/* Social Media */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Follow Our Journey</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="group">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                        <span className="text-white font-bold text-sm">f</span>
                      </div>
                    </a>
                    <a href="#" className="group">
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                        <span className="text-white font-bold text-sm">t</span>
                      </div>
                    </a>
                    <a href="#" className="group">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                        <span className="text-white font-bold text-sm">i</span>
                      </div>
                    </a>
                    <a href="#" className="group">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                        <span className="text-white font-bold text-sm">w</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white relative">
                  Quick Links
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                </h4>
                <ul className="space-y-3">
                  {['About Us', 'Our Story', 'Careers', 'Press', 'Blog'].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-orange-400 transition-all duration-300 flex items-center group"
                      >
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white relative">
                  Support
                  <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                </h4>
                <ul className="space-y-3">
                  {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-orange-400 transition-all duration-300 flex items-center group"
                      >
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="mt-16 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl p-8 border border-orange-500/20">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <h3 className="text-2xl font-bold text-white">Stay Updated with Eatopia</h3>
                <p className="text-gray-300">Get the latest updates on new restaurants, exclusive deals, and food trends.</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                  <p className="text-gray-400 text-center md:text-left">
                    &copy; 2024 Eatopia. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <span>Made with</span>
                    <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white text-xs">❤️</span>
                    </div>
                    <span>for food lovers</span>
                  </div>
                </div>

                {/* App Download Links */}
                {/* <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <span className="text-gray-300 text-sm">Android</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">i</span>
                    </div>
                    <span className="text-gray-300 text-sm">iOS</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroPage;
