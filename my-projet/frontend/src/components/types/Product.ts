export interface Product {
  _id: string;
  name: string;
  image: string[];        // plusieurs images
  price?: number;
  description?: string;
  variants?: {
    longueur: string;
    couleur: string;
    prix: number;
  }[];
}
