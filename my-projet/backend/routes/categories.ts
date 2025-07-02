// backend/routes/categories.ts

import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

interface CategoryItem { name: string; slug: string; }
interface Category {
  name: string;
  slug: string;
  description?: string;
  items?: CategoryItem[];
}

interface SubcatObj { name: string; slug: string; imageUrl?: string; }
interface Product {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  description: string;
  categorie: {
    principale: string;
    sous_categories: SubcatObj[];
  };
  [key: string]: any;
}

const router = Router();
const categoriesPath = path.join(__dirname, '../data/categories.json');
const productsPath   = path.join(__dirname, '../data/products.json');

function toSlug(s: any): string {
  if (typeof s !== 'string') return '';
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '')
    .replace(/-+/g, '-');
}

// ✅ 1. GET /api/categories — liste des catégories + sous‑cat.
router.get('/', (req, res, next) => {
  try {
    const cats: Category[] = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
    const prods: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const usedMainSlugs = new Set(prods.map(p => toSlug(p.categorie.principale)));
    const usedSubsByMain: Record<string, Set<string>> = {};

    prods.forEach(p => {
      const mainSlug = toSlug(p.categorie.principale);
      if (!usedSubsByMain[mainSlug]) usedSubsByMain[mainSlug] = new Set();
      p.categorie.sous_categories.forEach(sc => usedSubsByMain[mainSlug].add(sc.name));
    });

    const result = cats
      .filter(c => usedMainSlugs.has(c.slug))
      .map(c => ({
        name: c.name,
        slug: c.slug,
        description: c.description,
        items: (c.items || []).filter(i => usedSubsByMain[c.slug]?.has(i.name))
      }));

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// ✅ 2. GET /api/categories/:categorySlug/products — sous‑cat. d’une catégorie.
router.get('/:categorySlug/products', (req, res, next) => {
  try {
    const { categorySlug } = req.params;
    const prods: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const subs = new Set<string>();

    prods
      .filter(p => toSlug(p.categorie.principale) === categorySlug)
      .forEach(p => p.categorie.sous_categories.forEach(sc => subs.add(sc.name)));

    const result = Array.from(subs).map(name => ({ name, slug: toSlug(name) }));
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// ✅ 3. GET /api/categories/:categorySlug/items/:itemSlug/products — produits d’une sous‑cat.
router.get('/:categorySlug/items/:itemSlug/products', (req, res, next) => {
  try {
    const { categorySlug, itemSlug } = req.params;
    const cats: Category[] = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
    const cat = cats.find(c => c.slug === categorySlug);
    if (!cat) return res.status(404).json({ error: 'Catégorie inexistante' });
    if (!cat.items?.some(i => i.slug === itemSlug)) {
      return res.status(404).json({ error: 'Sous‑catégorie inexistante' });
    }

    const prods: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const filtered = prods.filter(p =>
      toSlug(p.categorie.principale) === categorySlug &&
      p.categorie.sous_categories.some(sc => sc.slug === itemSlug)
    );
    res.json(filtered);
  } catch (err) {
    next(err);
  }
});

export default router;
