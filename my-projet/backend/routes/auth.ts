import express from 'express';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const router = express.Router();
const usersFile = path.join(__dirname, '../data/users.json');

// 🔐 POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name)
    return res.status(400).json({ message: 'Tous les champs sont requis.' });

  const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

  const existingUser = users.find((u: any) => u.email === email);
  if (existingUser)
    return res.status(409).json({ message: 'Email déjà utilisé.' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.status(201).json({ message: 'Inscription réussie' });
});

// 🔐 POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  const user = users.find((u: any) => u.email === email);

  if (!user)
    return res.status(401).json({ message: 'Utilisateur non trouvé.' });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: 'Mot de passe incorrect.' });

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

export default router;
