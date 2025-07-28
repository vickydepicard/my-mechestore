// backend/routes/orders.ts
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const ordersFile = path.join(__dirname, '../data/orders.json');

router.post('/', (req, res) => {
  const { items, total, customer } = req.body;
  const orderId = uuidv4();
  const newOrder = { orderId, items, total, customer, createdAt: new Date().toISOString() };

  let orders = [];
  if (fs.existsSync(ordersFile)) {
    orders = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
  }
  orders.push(newOrder);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

  res.status(201).json({ message: 'Order saved', orderId });
});

router.get('/:orderId', (req, res) => {
  const { orderId } = req.params;
  if (!fs.existsSync(ordersFile)) return res.status(404).json({ error: 'No orders' });

  const orders = JSON.parse(fs.readFileSync(ordersFile, 'utf-8'));
  const order = orders.find((o: any) => o.orderId === orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  res.json(order);
});

export default router;
