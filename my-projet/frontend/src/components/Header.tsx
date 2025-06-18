import React, { useState, useContext } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { CartContext } from './CartContext';
import CartModal from './CartModal';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { getCartCount } = useContext(CartContext);

  return (
    <>
      <header className="fixed top-0 w-full z-50">
        <nav className="flex items-center justify-between bg-white px-6 md:px-12 py-3 shadow-sm">
          <img src="/logo.png" alt="Logo" className="h-10 md:h-14" />

          <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            <li><a href="#" className="hover:text-pink-600">Nouveautés</a></li>
          </ul>

          <div className="hidden md:flex items-center space-x-4 text-gray-700">
            <div className="relative cursor-pointer hover:text-pink-600" onClick={() => setShowCart(true)}>
              <FiShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {getCartCount()}
                </span>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setOpen(o => !o)}>
              {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />

      {/* Marge haute pour éviter que le contenu soit masqué */}
      <div className="h-[calc(60px+32px)] md:h-[calc(72px+32px)]"></div>
    </>
  );
}
