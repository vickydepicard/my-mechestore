import { Link } from "react-router-dom";
import { Product } from "./types/Product"; // Assure-toi du chemin correct

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded shadow hover:shadow-lg transition p-4">
        <img
          src={product.image[0] || "/placeholder.jpg"} // 🔹 image correspond à Product.image
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      </div>
    </Link>
  );
}
