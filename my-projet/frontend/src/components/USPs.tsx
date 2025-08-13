import { FiCreditCard, FiTruck, FiSmile } from "react-icons/fi";

const features = [
  { icon: FiCreditCard, title: "Paiement 3× sans frais", desc: "Paiement en 3× à partir de 100 € via OM" },
  { icon: FiTruck, title: "Livraison gratuite", desc: "Offerts dès 35 € en France, 149 € en DOM‑TOM/Europe" },
  { icon: FiSmile, title: "Satisfait ou remboursé", desc: "Retour sous 14 jours si vous n’êtes pas satisfait" },
];

export default function USPs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((f, i) => (
          <div key={i} className="space-y-4">
            <f.icon size={48} className="mx-auto text-pink-600" />
            <h3 className="text-xl font-semibold text-gray-900">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
