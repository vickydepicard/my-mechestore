// src/components/types.ts
export interface Variant {
  longueur: string;
  couleur: string;
  prix: number;
  ancien_prix?: number;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  images: string[];
  price: number;
  currency?: string;
  description?: string;
  details?: string[];
  variants?: Variant[];
  note?: { moyenne: number; nombre: number };
  nouveau?: boolean;
}

export interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock?: number;
}
