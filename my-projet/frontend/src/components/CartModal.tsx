import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { FiX } from 'react-icons/fi';
import clsx from 'clsx';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className={clsx(
      "fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg z-[1000] transition-transform duration-300 ease-in-out",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">🛒 Mon Panier</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-pink-600">
          <FiX size={22} />
        </button>
      </div>

      <div className="p-5 flex flex-col h-[calc(100%-64px)] overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Votre panier est vide.</p>
        ) : (
          <>
            <div className="space-y-4 flex-1">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 border rounded-lg p-3">
                  <img
                    src={item.image?.[0]}
                    alt={item.name}
                    className="w-14 h-14 rounded object-contain bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/produit/${item._id}`);
                      onClose();
                    }}
                  />
                  <div className="flex-1">
                    <p
                      className="text-sm font-medium text-gray-800 cursor-pointer hover:text-pink-600"
                      onClick={() => {
                        navigate(`/produit/${item._id}`);
                        onClose();
                      }}
                    >
                      {item.name}
                    </p>
                    <p className="text-pink-600 font-bold text-sm">{item.price.toFixed(2)} €</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Total :</span>
                <span className="text-pink-600 font-semibold">{getCartTotal().toFixed(2)} €</span>
              </div>

              <button
                onClick={clearCart}
                className="w-full text-sm text-red-600 hover:underline mb-3"
              >
                Vider le panier
              </button>

<button
  onClick={() => {
    onClose(); // Ferme le panier
    navigate("/checkout"); // Redirection vers la page de checkout
  }}
  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg text-sm font-semibold transition"
>
  Commander
</button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
