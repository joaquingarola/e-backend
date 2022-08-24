const { Router } = require("express")
const Contenedor = require('../Contenedor.js');
/* const isAuthenticated = require('../Middleware/auth.js'); */

const data = new Contenedor('product');
const routerProducts = new Router();

routerProducts.get("/", async (req, res) => {
  try{
    let prods = await data.getAll();
    res.json(prods);
  } 
  catch(err){
    console.log("error", err);
  }
});

routerProducts.get('/:id', async (req, res) =>{
  try{
    const id = parseInt(req.params.id);
    let prod = await data.getById(id);
    res.json(prod);
  } 
  catch(err){
    console.log(err);
  }
});

routerProducts.post('/', async (req, res) => {
  try {
    const add = req.body;
    await data.save(add);
    res.redirect('/');
  } catch (e) {
    console.error(e);
  }
});

routerProducts.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const update = req.body;
    const result = await data.update(update, id);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
});

routerProducts.delete('/:id', async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    let response = await data.deleteById(id);
    res.json(response);
  } catch (e) {
    console.error(e);
  }
});

module.exports = routerProducts;