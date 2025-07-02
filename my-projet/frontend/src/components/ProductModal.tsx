import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./CartContext";

interface Product {
  _id?: string;
  name: string;
  images: string[];
  price?: number;
  description?: string;
  variants?: {
    longueur: string;
    couleur: string;
    prix: number;
  }[];
}

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  product: Product | null;
}

export default function ProductModal({ isOpen, onRequestClose, product }: Props) {
  const { addToCart } = useContext(CartContext);
  const [currentImage, setCurrentImage] = useState<string>("");
  const fallbackImage = "/placeholder.jpg";

  useEffect(() => {
    if (isOpen && product) {
      setCurrentImage(product.images?.[0] ?? fallbackImage);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const prix = product.variants?.[0]?.prix ?? product.price ?? 0;
  const prixAffiche = prix ? `${prix.toLocaleString()} FCFA` : "N/A";

  return (
    <div
      className="fixed z-[1000] inset-0 pointer-events-none flex justify-center items-start mt-20 md:mt-32"
      style={{ backdropFilter: "none" }}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl border shadow-xl p-6 mx-4 pointer-events-auto animate-fadeIn"
      >
        <button
          onClick={onRequestClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-pink-600 text-3xl font-bold"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image principale */}
          <div className="flex-1">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-72 object-contain rounded-lg border"
            />

            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() => setCurrentImage(img)}
                    className={`h-16 w-16 rounded-lg cursor-pointer border-2 ${
                      img === currentImage ? "border-pink-600" : "border-gray-200"
                    } object-contain transition-transform hover:scale-105`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Infos produit */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-pink-600 text-2xl font-extrabold mb-4">{prixAffiche}</p>

              {product.description && (
                <p className="text-gray-600 mb-4 whitespace-pre-wrap">{product.description}</p>
              )}
            </div>

            <button
              onClick={() => {
                addToCart({
                  id: product._id,
                  name: product.name,
                  price: prix,
                  image: currentImage,
                  quantity: 1,
                });
                onRequestClose();
              }}
              className="mt-5 w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-base font-semibold transition"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
