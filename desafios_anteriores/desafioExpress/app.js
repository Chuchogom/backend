import express from 'express';
const app = express();
import ProductManager from './src/products.js';
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts(limit);
    res.send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/products', async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  await productManager.addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  );
  res.send('Product added successfully');
});

app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await productManager.getProductById(productId);
  res.send(product);
});

app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  await productManager.updateProduct(productId, updatedProduct);
  res.send('Product updated successfully');
});

app.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;
  await productManager.deleteProduct(productId);
  res.send('Product deleted successfully');
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
