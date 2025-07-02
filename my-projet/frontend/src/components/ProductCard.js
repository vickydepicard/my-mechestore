import { Link } from 'react-router-dom';
export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded shadow hover:shadow-lg transition p-4">
        <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded" />
        <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      </div>
    </Link>
  );
}
