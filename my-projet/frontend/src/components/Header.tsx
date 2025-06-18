import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header superposé et fixe */}
      <header className="fixed top-0 w-full z-50">
        {/* Barre d'annonce */}
        <div className="bg-pink-50 text-sm text-center py-1">
          Livraison offerte dès 35 € – Service client : 01 71 93 24 48 – Satisfait ou remboursé
        </div>

        {/* Navbar main */}
        <nav className="flex items-center justify-between bg-white px-6 md:px-12 py-3 shadow-sm">
          <img src="/logo.png" alt="Logo" className="h-10 md:h-14" />
          <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            <li className="relative group">
              <button className="hover:text-pink-600">Catégories</button>
              <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white border shadow-md py-2 w-48">
                { ['Lisse','Body Wave','Kinky','Deep Wave','Loose Wave','Afro Curl'].map(cat =>
                  <a key={cat} href="#" className="block px-4 py-2 hover:bg-gray-100">{cat}</a>
                )}
              </div>
            </li>
            <li><a href="#" className="hover:text-pink-600">Nouveautés</a></li>
            <li><a href="#" className="hover:text-pink-600">Conseils Beauté</a></li>
          </ul>
          <div className="hidden md:flex items-center space-x-4 text-gray-700">
            <FiSearch size={20} className="hover:text-pink-600 cursor-pointer" />
            <FiShoppingCart size={20} className="hover:text-pink-600 cursor-pointer" />
            <FiUser size={20} className="hover:text-pink-600 cursor-pointer" />
          </div>
          <div className="md:hidden">
            <button onClick={() => setOpen(o => !o)}>
              {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>

        {/* Menu mobile */}
        {open && (
          <div className="md:hidden bg-white shadow-inner pb-4">
            <ul className="space-y-2 px-6 pt-4">
              <li><button className="w-full text-left py-2">Catégories</button></li>
              <li><a href="#" className="block py-2">Nouveautés</a></li>
              <li><a href="#" className="block py-2">Conseils Beauté</a></li>
              <li className="flex space-x-4 pt-2">
                <FiSearch size={20} className="cursor-pointer" />
                <FiShoppingCart size={20} className="cursor-pointer" />
                <FiUser size={20} className="cursor-pointer" />
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Espace réservé (offset) pour ne pas cacher le slider */}
      <div className="h-[calc(60px+32px)] md:h-[calc(72px+32px)]"></div>
    </>
  );
}
