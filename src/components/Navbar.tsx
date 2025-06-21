"use client";
import { useState, useEffect } from "react";
import { UtensilsCrossed, Menu, X, ChevronDown } from "lucide-react";
import UserProfile from "@/components/user-profile";
import { User } from "@prisma/client";
import Link from "next/link";

const Navbar = ({ user }: { user: User | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex gap-2 items-center group">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <UtensilsCrossed className="text-white w-5 h-5" />
            </div>
            <h1 className="FascinateInline text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-bold">
              Eatopia
            </h1>
          </Link>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolled
                ? "text-gray-800 hover:bg-orange-50"
                : "text-gray-800 hover:bg-white/20"
            }`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8">
              <li>
                <Link
                  href="/"
                  className={`font-medium transition-all duration-300 hover:text-orange-600 relative group ${
                    isScrolled ? "text-gray-800" : "text-gray-800"
                  }`}
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className={`font-medium transition-all duration-300 hover:text-orange-600 relative group ${
                    isScrolled ? "text-gray-800" : "text-gray-800"
                  }`}
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#menu"
                  className={`font-medium transition-all duration-300 hover:text-orange-600 relative group ${
                    isScrolled ? "text-gray-800" : "text-gray-800"
                  }`}
                >
                  Menu
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className={`font-medium transition-all duration-300 hover:text-orange-600 relative group ${
                    isScrolled ? "text-gray-800" : "text-gray-800"
                  }`}
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <UserProfile user={user} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-orange-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <ul className="flex flex-col gap-6">
              <li>
                <Link
                  href="/"
                  className="text-gray-800 font-medium hover:text-orange-600 transition-colors duration-300 flex items-center justify-between group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Home</span>
                  <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-gray-800 font-medium hover:text-orange-600 transition-colors duration-300 flex items-center justify-between group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>About</span>
                  <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="#menu"
                  className="text-gray-800 font-medium hover:text-orange-600 transition-colors duration-300 flex items-center justify-between group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Menu</span>
                  <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-800 font-medium hover:text-orange-600 transition-colors duration-300 flex items-center justify-between group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Dashboard</span>
                  <ChevronDown className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </li>
              <li className="pt-4 border-t border-orange-100">
                <UserProfile user={user} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
