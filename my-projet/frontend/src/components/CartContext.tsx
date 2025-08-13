import React, { createContext, useState, useEffect, useContext } from "react";
import { CartItem } from "./types";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  updateCartItemQuantity: (_id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartCount: () => 0,
  getCartTotal: () => 0,
  updateCartItemQuantity: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (_id: string) => setCartItems(prev => prev.filter(item => item._id !== _id));
  const clearCart = () => setCartItems([]);
  const updateCartItemQuantity = (_id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item._id === _id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };
  const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);
  const getCartTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartCount, getCartTotal, updateCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
