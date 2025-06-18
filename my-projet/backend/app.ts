import express from 'express'
import cors from 'cors'

import bookRouter from './routes/book.route'
import productRoutes from './routes/productRoutes';

const app = express()
const router = express.Router();


app.use(cors())
app.use(express.json())

app.use('/books', bookRouter)


// Point de test racine
app.get('/', (req, res) => {
  res.send('API Mechestore en ligne');
});

// API produits
app.use('/api/products', productRoutes);

export default app
