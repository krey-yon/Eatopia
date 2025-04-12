"use client"
import { useState } from 'react';
import { UtensilsCrossed, Menu, X } from 'lucide-react';
import UserProfile from "@/components/user-profile";
import {User} from "@prisma/client";

const Navbar = ({user} : {user : User | null}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='flex justify-between items-center px-4 md:px-10 py-2 relative'>
      <div className='flex gap-1 items-center'>
        <UtensilsCrossed className='text-black' />
        <h1 className='text-black font-bold'>Eatopia</h1>
      </div>
      
      <button 
        className='text-black md:hidden' 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop menu */}
      <div className='text-black hidden md:flex gap-5 items-center'>
        <ul className='flex gap-4'>
          <li className='hover:text-orange-600 cursor-pointer'>Home</li>
          <li className='hover:text-orange-600 cursor-pointer'>About</li>
          <li className='hover:text-orange-600 cursor-pointer'>Menu</li>
          <li className='hover:text-orange-600 cursor-pointer'>Contact</li>
        </ul>
        <UserProfile user={user}/>
      </div>

      {isMenuOpen && (
        <div className='absolute top-full left-0 right-0 bg-white shadow-md py-4 z-10 md:hidden'>
          <ul className='flex flex-col items-center gap-4'>
            <li className='hover:text-orange-600 cursor-pointer'>Home</li>
            <li className='hover:text-orange-600 cursor-pointer'>About</li>
            <li className='hover:text-orange-600 cursor-pointer'>Menu</li>
            <li className='hover:text-orange-600 cursor-pointer'>Contact</li>
            <li>
                <UserProfile user={user}/>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;