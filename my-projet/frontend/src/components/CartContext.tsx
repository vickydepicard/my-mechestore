import React, { createContext, useState, useEffect, useContext } from "react";

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}

// Création du contexte avec des valeurs par défaut
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartCount: () => 0,
  getCartTotal: () => 0,
});

// Provider pour englober ton App
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Récupération du panier localStorage au chargement
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Sauvegarde automatique du panier dans le localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fonctions de manipulation du panier
  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  const removeFromCart = (_id: string) => {
    setCartItems(prev => prev.filter(item => item._id !== _id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => cartItems.length;

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook personnalisé pour accéder au contexte facilement
export const useCart = () => useContext(CartContext);
