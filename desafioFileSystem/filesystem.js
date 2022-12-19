const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };

  productId = () => {
    const count = this.products.length;
    const nextId = count > 0 ? this.products[count - 1].id + 1 : 1;

    return nextId;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
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
      return "Product Not Found";
    }

    return product;
  };

  updateProduct = (productId, updatedProduct) => {
    const index = this.products.findIndex((product) => product.id == productId);

    if (index === -1) {
      return "Product Not Found";
    }

    this.products[index] = { ...this.products[index], ...updatedProduct };
    this.saveProductsToFile();
  };

  deleteProduct = (productId) => {
    const index = this.products.findIndex((product) => product.id == productId);

    if (index === -1) {
      return "Product Not Found";
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


const manager = new ProductManager
console.log(manager.getProducts());
manager.addProduct('producto prueba','Este es un producto prueba', 200, 'Sin imagen','abc123',25)
console.log(manager.getProducts());
manager.getProductById(1)

const updatedProduct ={
  title:'Producto Prueba',
  price: 99.99
}
manager.updateProduct(1,updatedProduct)

manager.deleteProduct(2)


