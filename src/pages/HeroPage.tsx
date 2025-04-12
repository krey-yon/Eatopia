import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import { User } from "@prisma/client";

const HeroPage = ({ user }: { user: User | null }) => {
  return (
    <div className="flex flex-col bg-stone-100 h-screen">
      <Navbar user={user} />
      <div className="flex flex-col justify-center items-center text-center h-full px-4 py-8">
        <h1 className="text-gray-900 font-extrabold text-5xl md:text-6xl lg:text-8xl mb-2 md:mb-4 FascinateInline">
          Delicious <br className="md:block" /> Meals
        </h1>
        <h2 className="text-gray-700 mb-6 md:mb-12 text-lg md:text-xl px-2">
          Discover the Best Food Delivery Service for Convenient and Satisfying
          Meals
        </h2>
        <div className="w-full max-w-4xl">
          <Image
            src={"/image/eatopia-hero-image.png"}
            height={776}
            width={1500}
            alt="hero-image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
