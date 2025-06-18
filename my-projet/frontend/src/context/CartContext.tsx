import React, { createContext, useContext, useEffect, useState } from 'react';

interface Product {
  _id?: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
}

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getTotalPrice: () => number;
  getCartItemById: (id: string) => Product | undefined;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCartCount: () => 0,
  getTotalPrice: () => 0,
  getCartItemById: () => undefined
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // ✅ Charger le panier depuis le localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      } catch (e) {
        console.error("Erreur de parsing du localStorage", e);
      }
    }
  }, []);

  // ✅ Sauvegarder dans le localStorage après toute mise à jour
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Ajouter un produit au panier
  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  // ✅ Supprimer un produit par index
  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // ✅ Vider le panier
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // ✅ Compter les articles
  const getCartCount = () => cartItems.length;

  // ✅ Calculer le total
  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price, 0);

  // ✅ Retrouver un produit du panier par ID
  const getCartItemById = (id: string) =>
    cartItems.find(item => item._id === id);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
        getTotalPrice,
        getCartItemById
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook pratique
export const useCart = () => useContext(CartContext);
