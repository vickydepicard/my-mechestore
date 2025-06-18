import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// ✅ Lire tous les produits (mock depuis products.json)
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data/products.json');
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(rawData);
    res.json(products);
  } catch (error) {
    console.error('Erreur lecture products.json:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ Best-sellers : produits triés par "sales"
router.get('/best-sellers', (req, res) => {
  const filePath = path.join(__dirname, '../data/products.json');
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(rawData);
    const bestSellers = [...products].sort((a, b) => b.sales - a.sales).slice(0, 10);
    res.json(bestSellers);
  } catch (error) {
    console.error('Erreur lecture best-sellers:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ Nouveautés : lecture de new-arrivals.json
router.get('/new-arrivals', (req, res) => {
  const filePath = path.join(__dirname, '../data/new-arrivals.json');
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(rawData);
    res.json(products);
  } catch (error) {
    console.error('Erreur lecture new-arrivals:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ Un produit par ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const filePath = path.join(__dirname, '../data/products.json');
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(rawData);
    const product = products.find((p: any) => p._id === id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produit introuvable' });
    }
  } catch (error) {
    console.error('Erreur lecture produit par ID:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
