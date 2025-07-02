import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

interface CategoryItem { name: string; slug: string; }
interface Category { name: string; slug: string; items?: CategoryItem[]; }
interface Product { categorie: { principale: string; sous_categories: string[] }; [key: string]: any; }

const router = Router();
const categoriesPath = path.join(__dirname, '../data/categories.json');
const productsPath = path.join(__dirname, '../data/products.json');

const toSlug = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');

// 🟢 GET /api/categories
// ✅ GET /api/categories → uniquement les catégories utilisées dans les produits
router.get('/', (req, res, next) => {
  try {
    const cats: Category[] = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
    const prods: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

    const usedMainSlugs = new Set(
      prods.map(p => toSlug(p.categorie.principale))
    );

    const result = cats.filter(c => usedMainSlugs.has(toSlug(c.slug)));
    res.json(result);
  } catch (err) {
    next(err);
  }
});


// 🟢 GET /api/categories/:categorySlug/products
router.get('/:categorySlug/products', (req, res, next) => {
  try {
    const { categorySlug } = req.params;
    const prods: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

    const subs = new Set<string>();
    prods
      .filter(p => toSlug(p.categorie.principale) === categorySlug)
      .forEach(p => p.categorie.sous_categories.forEach(sc => subs.add(sc)));

    const result = Array.from(subs).map(name => ({ name, slug: toSlug(name) }));
    console.log(`/products for ${categorySlug}:`, result);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// 🟢 GET /api/categories/:categorySlug/items/:itemSlug/products
router.get('/:categorySlug/items/:itemSlug/products', (req, res, next) => {
  try {
    const { categorySlug, itemSlug } = req.params;
    const cats: Category[] = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
    const cat = cats.find(c => c.slug === categorySlug);
    if (!cat) return res.status(404).json({ error: 'Cat introuvable' });

    if (!cat.items?.some(i => i.slug === itemSlug))
      return res.status(404).json({ error: 'Sous-cat introuvable' });

    const prods: Product[] = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
    const filtered = prods.filter(p =>
      toSlug(p.categorie.principale) === categorySlug &&
      p.categorie.sous_categories.some(sc => toSlug(sc) === itemSlug)
    );

    console.log(`Products for ${categorySlug}/${itemSlug}:`, filtered);
    res.json(filtered);
  } catch (err) {
    next(err);
  }
});

export default router;
