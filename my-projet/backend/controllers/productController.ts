import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const getProductById = (req: Request, res: Response) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, '../data/products.json');

  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(rawData);
    const product = products.find((p: any) => p._id === id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(product);
  } catch (error) {
    console.error('Erreur lecture produit:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
