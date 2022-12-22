import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

class ProductManager {
  constructor() {
    this.products = [];
  }

  async getProducts(limit) {
    try {
      const products = this.products.slice(0, limit);
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  productId = () => {
    const count = this.products.length;
    const nextId = count > 0 ? this.products[count - 1].id + 1 : 1;

    return nextId;
  };

  addProduct = (title, description, price, thumbnail, stock) => {
    //Unique code
    const code = `PRD-${this.productId()}`;

    // Check if code already exists
    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      return 'Product with this code already exists';
    }

    const id = this.productId();
    const product = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock: stock ?? 50,
    };

    this.products.push(product);
    this.saveProductsToFile();
  };

  getProductById = (productId) => {
    const product = this.products.find((product) => product.id == productId);

    if (product == undefined) {
      return 'Product Not Found';
    }

    return product;
  };

  updateProduct = (productId, updatedProduct) => {
    //Unique code
    const code = `PRD-${this.productId()}`;
    // Check if code already exists
    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      return 'Product with this code already exists';
    }

    const index = this.products.findIndex((product) => product.id == productId);
    if (index === -1) {
      return 'Product Not Found';
    }

    // Update code field of updatedProduct object
    updatedProduct.code = code;
    this.products[index] = { ...this.products[index], ...updatedProduct };
    this.saveProductsToFile();
  };

  deleteProduct = (productId) => {
    const index = this.products.findIndex((product) => product.id == productId);

    if (index === -1) {
      return 'Product Not Found';
    }

    this.products.splice(index, 1);
    this.saveProductsToFile();
  };

  async loadProductsFromFile() {
    try {
      const data = await readFile('products.json');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  }

  async saveProductsToFile() {
    try {
      await writeFile('products.json', JSON.stringify(this.products));
    } catch (error) {
      console.error(error);
    }
  }
}

export default ProductManager;
