import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "./CartContext";

interface Product {
  _id?: string;
  name: string;
  images: string[];
  price: number;
  description?: string;
}

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  product: Product;
}

export default function ProductModal({ isOpen, onRequestClose, product }: Props) {
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const { addToCart } = useContext(CartContext);

  // Réinitialise l'image à chaque ouverture
  useEffect(() => {
    if (isOpen) {
      setCurrentImage(product.images[0]);
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-transparent">
      <div className="bg-white w-[90%] max-w-sm rounded-2xl p-4 shadow-xl relative animate-slideIn">
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>

        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-64 object-contain rounded-md mb-4"
        />

        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setCurrentImage(img)}
              className={`h-16 w-16 rounded-md cursor-pointer border-2 ${
                img === currentImage ? "border-pink-600" : "border-gray-200"
              } object-contain`}
            />
          ))}
        </div>

        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-pink-600 text-xl font-semibold mt-1">
          {product.price.toFixed(2)} €
        </p>

        {product.description && (
          <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        )}

        <button
          onClick={() => {
            addToCart(product); // via contexte (mise à jour auto du panier)
            onRequestClose();
          }}
          className="mt-5 w-full py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-sm font-semibold"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
