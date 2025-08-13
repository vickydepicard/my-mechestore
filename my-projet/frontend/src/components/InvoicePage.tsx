import { useCart } from "../components/CartContext"; // chemin relatif correct depuis pages/
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const {
    cartItems,
    getCartTotal,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleQuantityChange = (itemId: string, quantity: number, stock: number) => {
    if (quantity >= 1 && quantity <= stock) {
      updateCartItemQuantity(itemId, quantity);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();

      if (data?.orderId) {
        clearCart(); // on vide le panier après la commande
        navigate(`/invoice/${data.orderId}`);
      }
    } catch (err) {
      console.error("Erreur lors du checkout :", err);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <p className="text-lg text-gray-600">Votre panier est vide.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-pink-600 text-center">🧾 Récapitulatif de commande</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Liste des produits */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex gap-4 border-b pb-4">
              <img
                src={item.image[0] || "/placeholder.jpg"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md bg-gray-100"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.price.toLocaleString()} FCFA / unité</p>

                {/* Quantité */}
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-sm text-gray-600">Quantité :</label>
                  <input
                    type="number"
                    min={1}
                    max={item.stock || 99}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value), item.stock || 99)
                    }
                    className="w-16 border rounded-md px-2 py-1 text-center text-sm"
                  />
                  {item.stock && item.stock <= 5 && (
                    <span className="text-red-500 text-xs ml-2">Stock faible</span>
                  )}
                </div>

                <p className="text-sm mt-1 text-gray-600">
                  Total : <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 transition duration-200"
                title="Supprimer le produit"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Total panier */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-fit">
          <h3 className="text-xl font-semibold mb-4">🛒 Total</h3>
          <p className="text-lg text-gray-700 mb-6">
            Sous-total :{" "}
            <span className="font-bold text-pink-600">{getCartTotal().toLocaleString()} FCFA</span>
          </p>
          <button
            onClick={handleCheckout}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-md font-semibold disabled:opacity-50"
            disabled={cartItems.length === 0}
          >
            Continuer vers le paiement
          </button>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Paiement sécurisé via Stripe ou PayPal bientôt disponible.
          </p>
        </div>
      </div>
    </div>
  );
}
