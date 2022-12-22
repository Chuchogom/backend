import express from 'express';
import router from './src/routers/index.router.js';

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use('/static', express.static('public'));

// Mount the product router on the '/api/products' path
app.use('/api', router);

// Route for root path
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Handle server errors
app.on('error', (error) => {
  console.error(error);
});

