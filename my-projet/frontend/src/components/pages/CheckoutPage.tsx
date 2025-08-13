// src/pages/CheckoutPage.tsx
import CheckoutForm from "../../components/CheckoutForm";
import { useCart } from "../CartContext";

const CheckoutPage = () => {
  const { cartItems, getCartTotal } = useCart(); // 🔹 correction du nom de la fonction

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Formulaire de commande */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Informations de commande</h2>
        <CheckoutForm />
      </div>

      {/* Résumé du panier */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">Résumé de votre commande</h3>
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item._id} className="flex justify-between border-b pb-2">
              <span className="font-medium">{item.name}</span>
              <span>{item.price.toLocaleString()} FCFA</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-4 border-t flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{getCartTotal().toLocaleString()} FCFA</span> {/* 🔹 correction ici aussi */}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
