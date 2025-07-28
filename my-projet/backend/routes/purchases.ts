import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/purchases', (req, res) => {
  const filePath = path.join(__dirname, '../data/purchases.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Erreur lecture données' });

    const purchases = JSON.parse(data);
    res.json(purchases);
  });
});

export default router;
