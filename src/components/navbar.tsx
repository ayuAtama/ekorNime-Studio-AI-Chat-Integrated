"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link href="/">

          <img
            src="/image/logo.png"
            alt="EkorNime Studio"
            className="w-40 h-10"
          ></img>

        </Link>
        <button className="block md:hidden text-gray-700" id="nav-bar" aria-label="Tombol Navigasi" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        <ul className="hidden md:flex space-x-4">
          <li>
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}>
              
                Home
              
            </Link>
          </li>
          <li>
            <Link href="/about-us" className="text-gray-700 hover:text-blue-500">
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link href="/products" className="text-gray-700 hover:text-blue-500">
              Produk Kami
            </Link>
          </li>
          <li>
            <Link href="/team" className="text-gray-700 hover:text-blue-500">
              Tim Kami
            </Link>
          </li>
        </ul>
        {isOpen && (
          <ul className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4 space-y-4">
            <li>
              <Link
                href="/"
                className="block text-gray-700 hover:text-blue-500"
                onClick={toggleMenu}>
                
                  Home
                
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="block text-gray-700 hover:text-blue-500"
                onClick={toggleMenu}>
                
                  Tentang Kami
                
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="block text-gray-700 hover:text-blue-500"
                onClick={toggleMenu}>
                
                  Produk Kami
                
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="block text-gray-700 hover:text-blue-500"
                onClick={toggleMenu}>
                
                  Tim Kami
                
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
