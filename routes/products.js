const { Router } = require("express")
const isAuthenticated = require('../Middleware/auth.js');
const routerProducts = new Router();
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById
} = require("../controllers/productsController")

routerProducts.get("/", getProducts);

routerProducts.get('/:id', getProductById);

routerProducts.post('/', isAuthenticated, addProduct);

routerProducts.put('/:id', isAuthenticated, updateProduct);

routerProducts.delete('/:id', isAuthenticated, deleteProductById);

module.exports = routerProducts;