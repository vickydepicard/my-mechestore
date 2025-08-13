// src/pages/ProductDetail.tsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../components/CartContext'

type Variant = {
  longueur: string
  couleur: string
  prix: number
  ancien_prix?: number
  stock: number
}

type Product = {
  _id: string
  name: string
  images: string[]
  description: string
  variants: Variant[]
  details: string[]
  note?: { moyenne: number; nombre: number }
  nouveau?: boolean
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedLength, setSelectedLength] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState<string | null>(null)
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
        setSelectedLength(data.variants[0]?.longueur ?? null)
        setSelectedColor(data.variants[0]?.couleur ?? null)
        setMainImage(data.images[0])
      })
      .catch(() => setError('Impossible de charger le produit'))
  }, [id])

  if (error) return <p className="py-10 text-center text-red-500">{error}</p>
  if (!product) return <p className="py-10 text-center">Chargement du produit…</p>

  const lengths = Array.from(new Set(product.variants.map(v => v.longueur)))
  const colorsForLength = Array.from(new Set(product.variants.filter(v => v.longueur === selectedLength).map(v => v.couleur)))
  const selectedVariant = product.variants.find(v => v.longueur === selectedLength && v.couleur === selectedColor)
  const visitors = Math.floor(Math.random() * 10) + 5
  const formatXOF = (amt: number) => amt.toLocaleString('fr-FR') + ' FCFA'

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-10">
      {/* Galerie */}
      <div className="space-y-4">
        <div className="relative w-full h-290 overflow-hidden rounded-lg shadow-lg">
          <img
            src={mainImage ?? ''}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            key={mainImage}
          />
        </div>
        <ul className="flex space-x-2 overflow-auto pb-2">
          {product.images.map((img, idx) => (
            <li key={idx}>
              <button
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${mainImage === img ? 'border-pink-600' : 'border-transparent'} focus:outline-none transition-transform transform hover:scale-105`}
              >
                <img src={img} alt={`Aperçu ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Infos & sélection */}
      <div>
        {product.nouveau && <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-full">Nouveau</span>}
        <h1 className="text-4xl font-bold uppercase mt-2">{product.name}</h1>

        <div className="flex items-center gap-2 mt-2">
          {Array.from({ length: Math.floor(product.note?.moyenne || 0) }).map((_, i) => (
            <span key={i} className="text-yellow-500">★</span>
          ))}
          {product.note?.nombre ? <span className="text-sm text-gray-600">({product.note.nombre} avis)</span> : null}
        </div>

        <div className="mt-4 flex items-baseline gap-4">
          {selectedVariant?.ancien_prix !== undefined && selectedVariant.ancien_prix > selectedVariant.prix && (
            <>
              <span className="text-xl text-gray-500 line-through">{formatXOF(selectedVariant.ancien_prix)}</span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                Économisez {formatXOF(selectedVariant.ancien_prix - selectedVariant.prix)}
              </span>
            </>
          )}
          <span className="text-3xl font-bold text-pink-600">
            {selectedVariant ? formatXOF(selectedVariant.prix * quantity) : '– FCFA'}
          </span>
        </div>

        <p className="mt-4 text-gray-700">{product.description}</p>

        {/* Sélection Longueur + Couleur */}
        <div className="mt-6 grid grid-cols-2 gap-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Longueur</label>
            <select
              value={selectedLength ?? ''}
              onChange={e => {
                const len = e.target.value
                setSelectedLength(len)
                setSelectedColor(product.variants.find(v => v.longueur === len)?.couleur ?? null)
              }}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 focus:border-pink-600"
            >
              {lengths.map(len => <option key={len}>{len}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Couleur</label>
            <div className="mt-1 flex items-center space-x-2">
              {colorsForLength.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-pink-600' : 'border-gray-300'} transform transition-transform hover:scale-110`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quantité + Ajout panier */}
        <div className="mt-6 flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantité</label>
            <div className="mt-1 flex rounded-md border border-gray-300 overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 bg-white hover:bg-gray-50">–</button>
              <input
                type="number"
                value={quantity}
                min={1}
                max={selectedVariant?.stock || 1}
                onChange={e => setQuantity(Math.max(1, Math.min(selectedVariant?.stock || 1, +e.target.value || 1)))}
                className="w-16 text-center focus:outline-none"
              />
              <button onClick={() => setQuantity(q => Math.min(selectedVariant?.stock || 1, q + 1))} className="px-3 bg-white hover:bg-gray-50">+</button>
            </div>
          </div>
<button
  onClick={() =>
    selectedVariant &&
    addToCart({
      _id: product._id,
      name: product.name,
      price: selectedVariant.prix,
      quantity,
      image: product.images[0] || "/placeholder.jpg", // 🔹 image unique pour CartItem
    })
  }
  disabled={!selectedVariant || selectedVariant.stock === 0}
  className={`inline-block bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition ${
    (!selectedVariant || selectedVariant.stock === 0) && "opacity-50 cursor-not-allowed"
  }`}
>
  Ajouter au panier
</button>

        </div>

        <p className="mt-4 text-gray-600">
          {selectedVariant
            ? selectedVariant.stock > 0
              ? `En stock (${selectedVariant.stock})`
              : 'Rupture de stock'
            : 'Sélectionnez longueur & couleur'}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {visitors} personne{visitors > 1 && 's'} regardent ce produit !
        </p>
      </div>

      {/* Look & Détails */}
      <div className="md:col-span-2 mt-12">
        <h2 className="text-2xl font-bold mb-4">Look & Détails</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {product.images.slice(1, 4).map((img, idx) => (
            <img key={idx} src={img} alt={`Look ${idx + 1}`} className="w-full h-60 object-cover rounded shadow-md" />
          ))}
        </div>
        <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
          {product.details.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      </div>
    </div>
  )
}
