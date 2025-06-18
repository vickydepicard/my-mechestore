import express from 'express'; // ✅ Tu dois importer express ici
import fs from 'fs';
import path from 'path';
import app from './app';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  sales?: number; // `sales` est optionnel pour les new-arrivals
}

const port = 4000;

// ⚠️ Sert le dossier images/ de manière publique
app.use('/images', express.static(path.join(__dirname, 'images')));

// ✅ Meilleures ventes
app.get('/api/products/best-sellers', (req, res) => {
  console.log('🔁 Request best-sellers received');
  const filePath = path.join(__dirname, 'data', 'products.json');

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const products: Product[] = JSON.parse(raw);
    const sorted = products.sort((a, b) => (b.sales ?? 0) - (a.sales ?? 0)).slice(0, 10);
    console.log(`➡️ Returning ${sorted.length} products`);
    res.json(sorted);
  } catch (err: any) {
    console.error('🔥 Error reading products.json:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Nouveautés
app.get('/api/products/new-arrivals', (req, res) => {
  console.log('🔁 Request new-arrivals received');
  const filePath = path.join(__dirname, 'data', 'new-arrivals.json');

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const products: Product[] = JSON.parse(raw);
    console.log(`➡️ Returning ${products.length} new arrivals`);
    res.json(products);
  } catch (err: any) {
    console.error('🔥 Error reading new-arrivals.json:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`🚀 App listening at http://localhost:${port}`));
