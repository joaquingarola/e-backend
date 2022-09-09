const { Router } = require("express");
const routerCarts = new Router();
const {
  createCart,
  deleteCart,
  getCartProducs,
  addProductToCart,
  deleteProductFromCart
} = require("../controllers/cartsController");

routerCarts.post('/', createCart);

routerCarts.delete('/:id', deleteCart);

routerCarts.get("/:id/productos", getCartProducs);

routerCarts.post("/:id/productos", addProductToCart);

routerCarts.delete("/:id/productos/:id_prod", deleteProductFromCart);

module.exports = routerCarts;