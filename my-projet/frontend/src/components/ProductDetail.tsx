// src/pages/ProductDetail.tsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../components/CartContext'

interface Variant {
  length: string
  color: string
  price: number
  oldPrice?: number
  stock: number
}

interface Product {
  _id: string
  name: string
  images: string[]
  description: string
  variants: Variant[]
  details: string[]
  rating: { average: number; count: number }
  isNew: boolean
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedLength, setSelectedLength] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:4000/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data: Product) => {
        setProduct(data)
        setSelectedLength(data.variants[0]?.length ?? null)
        setSelectedColor(data.variants[0]?.color ?? null)
      })
      .catch(() => setError('Impossible de charger le produit'))
  }, [id])

  if (error) return <p className="py-10 text-center text-red-500">{error}</p>
  if (!product) return <p className="py-10 text-center">Chargement du produit…</p>

  const lengths = Array.from(new Set(product.variants.map(v => v.length)))
  const colorsForLength = Array.from(
    new Set(
      product.variants
        .filter(v => v.length === selectedLength)
        .map(v => v.color)
    )
  )

  // Variante sélectionnée selon longueur + couleur
  const selectedVariant = product.variants.find(
    v => v.length === selectedLength && v.color === selectedColor
  )

  const oldPrice = selectedVariant?.oldPrice
  const visitors = Math.floor(Math.random() * 10) + 5

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-10">
      {/* Galerie */}
      <div>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-96 object-cover rounded mb-4"
        />
        <ul className="flex space-x-2 overflow-auto">
          {product.images.map((img, i) => (
            <li key={i}>
              <img
                src={img}
                alt={`Mini ${i + 1}`}
                className="w-24 h-24 object-cover rounded cursor-pointer hover:ring-2 hover:ring-pink-600"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Infos produit & sélection */}
      <div>
        {product.isNew && (
          <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-full">
            Nouveau
          </span>
        )}
        <h1 className="text-4xl font-bold uppercase mt-2">{product.name}</h1>

        <div className="flex items-center gap-2 mt-2">
          {Array.from({ length: Math.floor(product.rating.average) }).map((_, i) => (
            <span key={i} className="text-yellow-500">★</span>
          ))}
          {product.rating.count > 0 && (
            <span className="text-sm text-gray-600">
              ({product.rating.count} avis)
            </span>
          )}
        </div>

        <div className="mt-4 flex items-baseline gap-4">
          {oldPrice && (
            <>
              <span className="text-xl text-gray-500 line-through">
                {oldPrice.toFixed(2)} €
              </span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                Économisez {(oldPrice - (selectedVariant?.price ?? 0)).toFixed(2)} €
              </span>
            </>
          )}
          <span className="text-3xl font-bold text-pink-600">
            {selectedVariant?.price
              ? selectedVariant.price.toFixed(2) + ' €'
              : '–,– €'}
          </span>
        </div>

        <p className="mt-4 text-gray-700">{product.description}</p>

{/* Sélection Longueur + Couleur sur une même ligne */}
<div className="mt-6 grid grid-cols-2 gap-x-4 items-center">
  {/* Longueur */}
  <div>
    <label htmlFor="length-select" className="block text-sm font-medium text-gray-700">
      Longueur
    </label>
    <select
      id="length-select"
      value={selectedLength || ''}
      onChange={e => {
        const len = e.target.value
        setSelectedLength(len)
        const defColor = product.variants.find(v => v.length === len)?.color
        setSelectedColor(defColor || null)
        setQuantity(1)
      }}
      className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-pink-600 focus:ring-pink-600"
    >
      {lengths.map(len => (
        <option key={len} value={len}>{len}</option>
      ))}
    </select>
  </div>

  {/* Couleur */}
  <div>
    <label className="block text-sm font-medium text-gray-700">
      Couleur
    </label>
    <div className="mt-1 flex space-x-2">
      {colorsForLength.map(color => (
        <button
          key={color}
          type="button"
          onClick={() => setSelectedColor(color)}
          className={`w-8 h-8 rounded-full border-2 ${
            selectedColor === color ? 'border-pink-600' : 'border-gray-300'
          }`}
          style={{ backgroundColor: color }}
          aria-label={color}
        />
      ))}
    </div>
  </div>
</div>


{/* Quantité + Ajouter au panier sur une même ligne */}
<div className="mt-6 flex flex-wrap items-end gap-4">
  {/* Quantité */}
  <div>
    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
      Quantité
    </label>
    <div className="mt-1 flex max-w-xs rounded-md shadow-sm">
      <button
        type="button"
        onClick={() => setQuantity(q => Math.max(1, q - 1))}
        className="rounded-l-md border border-gray-300 bg-white px-3 text-gray-700 hover:bg-gray-50"
      >
        −
      </button>
      <input
        type="number"
        id="quantity"
        value={quantity}
        min={1}
        max={selectedVariant?.stock || 1}
        onChange={e => {
          const val = Math.max(1, Math.min(selectedVariant?.stock || 1, parseInt(e.target.value, 10) || 1))
          setQuantity(val)
        }}
        className="w-16 border-t border-b border-gray-300 text-center focus:outline-none"
        aria-label="Quantité"
      />
      <button
        type="button"
        onClick={() => setQuantity(q => Math.min(selectedVariant?.stock || q, q + 1))}
        className="rounded-r-md border border-gray-300 bg-white px-3 text-gray-700 hover:bg-gray-50"
      >
        +
      </button>
    </div>
  </div>

  {/* Bouton panier */}
  <button
    onClick={() => selectedVariant && addToCart({ ...product, price: selectedVariant.price, quantity })}
    disabled={!selectedVariant || selectedVariant.stock === 0}
    className={`inline-flex items-center justify-center rounded-full bg-black py-3 px-6 text-white transition hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-600 ${
      !selectedVariant || selectedVariant.stock === 0 ? 'opacity-50' : ''
    }`}
  >
    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 5.6a1 1 0 001 .4h12a1 1 0 001-.8L21 13M7 13V7m10 6V7" />
    </svg>
    Ajouter au panier
  </button>
</div>


        {/* Stock & visiteurs */}
        <p className="mt-4 text-sm text-gray-600">
          {selectedVariant
            ? selectedVariant.stock > 0
              ? `En stock (${selectedVariant.stock})`
              : 'Rupture de stock'
            : 'Sélectionnez la longueur & la couleur'}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {visitors} personnes regardent actuellement ce produit !
        </p>
      </div>

      {/* Section Look & Détails */}
      <div className="md:col-span-2 mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Look & Détails</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {product.images.slice(1, 4).map((img, i) => (
            <img key={i} src={img} alt={`Look ${i + 1}`} className="w-full h-60 object-cover rounded" />
          ))}
        </div>
        <ul className="mt-4 space-y-2 text-gray-700">
          {product.details.map((d, i) => (
            <li key={i}>• {d}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
