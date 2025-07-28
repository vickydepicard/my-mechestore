import express from 'express';
import fs from 'fs';
import path from 'path';
import app from './app';

import categories from './data/categories.json';
import products from './data/products.json';

import categoriesRouter from './routes/categories';
import productSubcatsRouter from './routes/productSubcats';

import ordersRoutes from './routes/orders';

import authRoutes from './routes/auth';

interface Category {
  name: string;
  slug: string;
  items?: {
    name: string;
    slug: string;
  }[];
}

interface Promotion {
  active: boolean;
  date_debut: string;
  date_fin: string;
  pourcentage: number;
}

interface Product {
  _id: string;
  name: string;
  image?: string;
  images?: string[];
  price?: number;
  sales?: number;
  category?: string;
  promotion?: Promotion;
}

const port = process.env.PORT || 4000;

// 🖼️ Pour servir les images
app.use('/images', express.static(path.join(__dirname, 'images')));

// 📦 Route pour catégories
app.use('/api/categories', categoriesRouter);

// 📦 Route pour sous-catégories et produits par sous-catégorie
app.use('/api', productSubcatsRouter);

// ✅ Route brute (ancienne version si utile)
app.get('/api/categories-old', (req, res) => {
  res.json(categories);
});

// 🔥 Produits best sellers
app.get('/api/products/best-sellers', (req, res) => {
  const all = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8'));
  const sorted = (all as Product[]).sort((a, b) => (b.sales ?? 0) - (a.sales ?? 0)).slice(0, 10);
  res.json(sorted);
});

// 🆕 Nouveautés
app.get('/api/products/new-arrivals', (req, res) => {
  const arr = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'new-arrivals.json'), 'utf8'));
  res.json(arr);
});

// 🎯 Tous les produits ou par catégorie
app.get('/api/products', (req, res) => {
  const all = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8')) as Product[];
  const cat = req.query.category as string | undefined;

  if (cat) {
    const filtered = all.filter(p => p.category === cat);
    return res.json(filtered);
  }

  res.json(all);
});

// 🏷️ Produits en promotion (date valide et active = true)
app.get('/api/promotions', (req, res) => {
  const produitsEnPromo = (products as Product[]).filter(prod =>
    prod.promotion?.active === true &&
    new Date(prod.promotion.date_debut) <= new Date() &&
    new Date(prod.promotion.date_fin) >= new Date()
  );
  res.json(produitsEnPromo);
});// 👇 Route pour les commandes
app.use('/api/orders', ordersRoutes);

app.use('/api/auth', authRoutes);

// 🛑 Validation : Alerte si une catégorie est invalide
const slugs = new Set((categories as Category[]).map((c) => c.slug));
(products as Product[]).forEach((p) => {
  if (p.category && !slugs.has(p.category)) {
    console.warn(`⚠️ Produit ${p._id} a une catégorie inconnue : "${p.category}"`);
  }
});

// 🚀 Lancement du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur : http://localhost:${port}`);
});
