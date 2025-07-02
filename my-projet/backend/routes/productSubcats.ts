import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

interface SubcatInfo {
  name: string;
  slug: string;
  imageUrl?: string;
}

interface Product {
  _id: string;
  categorie: {
    principale: string;
    sous_categories: SubcatInfo[];
  };
}

const router = Router();
const productsPath = path.join(__dirname, '../data/products.json');

// Transformer une chaîne en slug propre
function toSlug(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '')
    .replace(/-+/g, '-');
}

// Images par défaut si aucune imageUrl dans le JSON
const defaultImages: Record<string, string> = {
  'meches-lisses': 'http://localhost:4000/images/meches-lisses.jpg',
  bundles: 'http://localhost:4000/images/bundles.jpg',
  packs: 'http://localhost:4000/images/packs.jpg',
  tst: 'http://localhost:4000/images/default.jpg',
  'lace-front-wigs': 'http://localhost:4000/images/lace-front-wigs.jpg',
  'synthetic-human-hair-wigs': 'http://localhost:4000/images/synthetic-human-hair-wigs.jpg',
  'closure-4-4': 'http://localhost:4000/images/closure-4x4.jpg',
  shampoings: 'http://localhost:4000/images/shampoings.jpg',
  'bonnets-de-nuit': 'http://localhost:4000/images/bonnets-de-nuit.jpg',
  'bonnet-satin': 'http://localhost:4000/images/bonnet-satin.jpg',
};

// Route GET /api/subcategories : fournit toutes les sous-catégories uniques, avec image
router.get('/subcategories', (req: Request, res: Response, next: NextFunction) => {
  try {
    const raw = fs.readFileSync(productsPath, 'utf-8');
    const products = JSON.parse(raw) as Product[];

    const seen = new Map<string, {
      parent: string;
      parentSlug: string;
      name: string;
      slug: string;
      imageUrl: string;
    }>();

    products.forEach(p => {
      const parent = p.categorie.principale;
      const parentSlug = toSlug(parent);

      p.categorie.sous_categories.forEach(sc => {
        const slug = sc.slug;
        if (seen.has(slug)) return;

        const imageUrl = sc.imageUrl?.trim()
          || defaultImages[slug]
          || defaultImages['tst'];

        seen.set(slug, { parent, parentSlug, name: sc.name, slug, imageUrl });
      });
    });

    const result = Array.from(seen.values());
    console.log('→ /api/subcategories result:', result);
    return res.json(result);
  } catch (err) {
    console.error('⚠️ Erreur /api/subcategories:', err);
    return next(err);
  }
});

export default router;
