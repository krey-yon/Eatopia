"use client"
import { useState } from 'react';
import { UtensilsCrossed, Menu, X } from 'lucide-react';

const Navbar = () => {
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
        <button className='bg-orange-600 text-white rounded-md py-1 px-2 hover:bg-orange-700'>Sign Up</button>
      </div>

      {isMenuOpen && (
        <div className='absolute top-full left-0 right-0 bg-white shadow-md py-4 z-10 md:hidden'>
          <ul className='flex flex-col items-center gap-4'>
            <li className='hover:text-orange-600 cursor-pointer'>Home</li>
            <li className='hover:text-orange-600 cursor-pointer'>About</li>
            <li className='hover:text-orange-600 cursor-pointer'>Menu</li>
            <li className='hover:text-orange-600 cursor-pointer'>Contact</li>
            <li>
              <button className='bg-orange-600 text-white rounded-md py-1 px-4 hover:bg-orange-700'>
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;