import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

class ProductManager {
  constructor(path) {
    this.path = [];
  }

  async getProducts(limit) {
    try {
      const products = this.path.slice(0, limit);
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  productId = () => {
    const count = this.path.length;
    const nextId = count > 0 ? this.path[count - 1].id + 1 : 1;

    return nextId;
  };

  addProduct = async (title, description, price, thumbnail, stock) => {
    //Unique code
    const code = `PRD-${this.productId()}`;
  
    // Check if code already exists
    const existingProduct = this.path.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      throw new Error('Product with this code already exists');
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
  
    this.path.push(product);
    await this.saveProductsToFile();
  }

  getProductById = (productId) => {
    const product = this.path.find((product) => product.id == productId);

    return product ?? null;
  };

  updateProduct = (productId, updatedProduct) => {
    //Unique code
    const code = `PRD-${this.productId()}`;
    // Check if code already exists
    const existingProduct = this.path.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      return 'Product with this code already exists';
    }

    const index = this.path.findIndex((product) => product.id == productId);
    if (index === -1) {
      return 'Product Not Found';
    }

    // Update code field of updatedProduct object
    updatedProduct.code = code;
    this.path[index] = { ...this.path[index], ...updatedProduct };
    this.saveProductsToFile();
  };

  deleteProduct = (productId) => {
    const index = this.path.findIndex((product) => product.id == productId);

    if (index === -1) {
      return 'Product Not Found';
    }

    this.path.splice(index, 1);
    this.saveProductsToFile();
  };

  async loadProductsFromFile() {
    try {
      const data = await readFile('products.json');
      this.path = JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  }  

  async saveProductsToFile() {
    try {
      const data = JSON.stringify(this.path);
      await writeFile('products.json', data);
    } catch (error) {
      console.error(error);
    }
  }  
}

export default ProductManager;
