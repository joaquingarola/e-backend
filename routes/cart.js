const { Router } = require("express")
const Contenedor = require('../Contenedor.js');

const data = new Contenedor('Carts');
const routerCarts = new Router();

routerCarts.post('/', async (req, res) => {
    try {
      const add = {timestamp: new Date().toLocaleString('es-AR'), products: []};
      let id = await data.save(add);
      res.status(201).json(`Carrito creado con id ${id}`)
    } catch (e) {
      console.error(e);
    }
});

routerCarts.delete('/:id', async (req, res) => {
    try{
      const id = parseInt(req.params.id);
      let response = await data.deleteById(id);
      if(response !== 0){
        res.json(`Se ha eliminado con éxito el carrito con ID: ${response}`);
      } else{
        res.json({ error : 'Carrito no encontrado' })
      }
    } catch (e) {
      console.error(e);
    }
});

routerCarts.get("/:id/productos", async (req, res) => {
    try{
      const id = parseInt(req.params.id);
      let cart = await data.getById(id);
      if(cart === undefined){
        res.status(404).json({error: 'Carrito no encontrado'})
      } else {
        res.json(cart.products);
      }
    } 
    catch(err){
      console.log("error", err);
    }
});

routerCarts.post("/:id/productos", async (req, res) => {
    try{
      const id = parseInt(req.params.id);
      const carts = await data.getAll();
      let index = carts.findIndex((e) => e.id === id); 
      if (index !== -1) {
        if(carts[index].products.findIndex((e) => e.id === req.body.id) === -1){
          carts[index].products.push(req.body);
          await data.update(carts);
          res.json('Producto agregado con éxito');
        } else{
          res.status(201).json('Producto ya está agregado en el carrito');
        }
      } else {
        res.status(404).json({ error : 'Carrito no encontrado' })
      }
    } 
    catch(err){
      console.log("error", err);
    }
});

routerCarts.delete("/:id/productos/:id_prod", async (req, res) => {
  try{
    const id_cart = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const carts = await data.getAll();
    let index = carts.findIndex((e) => e.id === id_cart); 
    if (index !== -1) {
      carts[index].products = carts[index].products.filter(p => p.id !== id_prod);
      await data.update(carts);
      res.json('Carrito actualizado con éxito');
    } else {
      res.status(404).json({ error : 'Carrito no encontrado' })
    }
  } 
  catch(err){
    console.log("error", err);
  }
});

module.exports = routerCarts;