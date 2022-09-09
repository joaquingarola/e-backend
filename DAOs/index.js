require('dotenv').config();

const productsDatabase = process.env.PRODUCTS_DATABASE;
const cartsDatabase = process.env.CARTS_DATABASE;

if (process.env.CARTS_DATABASE === 'mongoDB' ||
    process.env.PRODUCTS_DATABASE === 'mongoDB') {

}

const CartsDAOmemory = require('./cartsDAO/CartsDAOmemory');
const CartsDAOfile = require('./cartsDAO/CartsDAOfile');
const CartsDAOmongoDB = require('./cartsDAO/CartsDAOmongoDB');
const CartsDAOfirebase = require('./cartsDAO/CartsDAOfirebase');

const ProductsDAOmemory = require('./productsDAO/ProductsDAOmemory');
const ProductsDAOfile = require('./productsDAO/ProductsDAOfile.js');
const ProductsDAOmongoDB = require('./productsDAO/ProductsDAOmongoDB');
const ProductsDAOfirebase = require('./productsDAO/ProductsDAOfirebase');

let cartsDAO;

switch (cartsDatabase) {
    case 'memory' :
        cartsDAO = new CartsDAOmemory();
        break;
    case 'file' :
        cartsDAO = new CartsDAOfile('./db/files/Carts.txt');
        break;
    case 'mongoDB' :
        const Cart = require('../db/mongoDB/schemas/cart');
        cartsDAO = new CartsDAOmongoDB(Cart);
        const connectToMongoDB = require('../db/mongoDB');
        connectToMongoDB()
            .then(() => console.log('Conectado con éxito a la base de datos de carrito'))
            .catch((err) => console.log(`Error: ${err}`))
        break;
    case 'firebase' :
        cartsDAO = new CartsDAOfirebase()
        break;
}
let productsDAO

switch (productsDatabase) {
    case 'memory' :
        productsDAO = new ProductsDAOmemory();
        break
    case 'file' :
        productsDAO = new ProductsDAOfile('./db/files/Products.txt');
        break
    case 'mongoDB' :
        const Product = require('../db/mongoDB/schemas/product');
        productsDAO = new ProductsDAOmongoDB(Product);
        const connectToMongoDB = require('../db/mongoDB');
        connectToMongoDB()
            .then(() => console.log('Conectado con éxito a la base de datos de productos'))
            .catch((err) => console.log(`Error: ${err}`))
        break
    case 'firebase' :
        productsDAO = new ProductsDAOfirebase();
        break
}

module.exports = {
    cartsDAO,
    productsDAO
};