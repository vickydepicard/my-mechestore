import express from 'express';
import fs from 'fs';
import path from 'path';
import app from './app';

import categories from './data/categories.json';
import products from './data/products.json';
import categoriesRoutes from './routes/categories'; // ✅ Nouveau

interface Category {
  name: string;
  slug: string;
  items?: {
    name: string;
    slug: string;
  }[];
}

interface Product {
  _id: string;
  name: string;
  image?: string;
  images?: string[];
  price?: number;
  sales?: number;
  category?: string;
}

const port = process.env.PORT || 4000;

app.use('/images', express.static(path.join(__dirname, 'images')));

// ✅ Routes dynamiques : filtrage par slug
app.use('/api/categories', categoriesRoutes); // <-- ✅ À ajouter ici

app.use('/api/categories', require('./routes/categories').default);

import categoriesRouter from './routes/categories';

app.use('/api/categories', categoriesRouter);

import productSubcatsRouter from './routes/productSubcats';
app.use('/api', productSubcatsRouter);



// ✅ Route de toutes les catégories brutes
app.get('/api/categories-old', (req, res) => {
  res.json(categories);
});

app.get('/api/products/best-sellers', (req, res) => {
  const all = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8'));
  const sorted = (all as Product[]).sort((a, b) => (b.sales ?? 0) - (a.sales ?? 0)).slice(0, 10);
  res.json(sorted);
});

app.get('/api/products/new-arrivals', (req, res) => {
  const arr = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new-arrivals.json'), 'utf8'));
  res.json(arr);
});

app.get('/api/products', (req, res) => {
  const all = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8')) as Product[];
  const cat = req.query.category as string | undefined;

  if (cat) {
    const filtered = all.filter(p => p.category === cat);
    return res.json(filtered);
  }
  res.json(all);
});

const slugs = new Set((categories as Category[]).map((c) => c.slug));
(products as Product[]).forEach((p) => {
  if (p.category && !slugs.has(p.category)) {
    console.warn(`⚠️ Produit ${p._id} a une catégorie inconnue : "${p.category}"`);
  }
});

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur : http://localhost:${port}`);
});
