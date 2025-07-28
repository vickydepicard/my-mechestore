// backend/routes/auth.ts
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

interface User {
  name: string;
  email: string;
  password: string;
}

const users: User[] = []; // à remplacer par une base de données réelle

const JWT_SECRET = 'votre_secret_clé_super_sécurisée';

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });
  res.status(201).json({ message: 'Utilisateur créé' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ error: 'Utilisateur introuvable' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Mot de passe invalide' });

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

export default router;
