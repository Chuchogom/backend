import { Router } from 'express';
import ProductManager from '../products.js';

const router = Router();
const productManager = new ProductManager();

// GET / - get all products
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET /:id - get a single product by ID
router.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await productManager.getProductById(productId);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.json(product);
  }
});

// POST / - add a new product
router.post('/api/products', async (req, res) => {
  try {
    const product = req.body;
    const productAdded = await productManager.addProduct(product);
    res.json({ message: 'Product added successfully', product: productAdded });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// PUT /:id - update a product
router.put('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  try {
    await productManager.updateProduct(productId, updatedProduct);
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product', error });
  }
});

// DELETE /:id - delete a product
router.delete('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    await productManager.deleteProduct(productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

export default router;
