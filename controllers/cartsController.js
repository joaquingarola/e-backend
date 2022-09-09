const data = require('../DAOs').cartsDAO;

createCart = async (req, res) => {
  try {
    const add = {timestamp: new Date().toLocaleString('es-AR'), products: []};
    let id = await data.save(add);
    res.status(201).json(`Carrito creado con id ${id}`)
  } catch (e) {
    console.error(e);
  }
};

deleteCart = async (req, res) => {
  try{
    const id = req.params.id;
    let response = await data.deleteById(id);
    if(response !== 0){
      res.json(`Se ha eliminado con éxito el carrito con ID: ${response}`);
    } else{
      res.json({ error : 'Carrito no encontrado' })
    }
  } catch (e) {
    console.error(e);
  };
};

getCartProducs = async (req, res) => {
  try{
    const id = req.params.id;
    let cart = await data.getById(id);
    if(cart === undefined){
      res.status(404).json({error: 'Carrito no encontrado'})
    } else {
      res.json(cart.products);
    }
  } 
  catch(err){
    console.log("error", err);
  };
};

addProductToCart = async (req, res) => {
  try{
    const id = req.params.id;
    const carts = await data.getAll();
    let index = carts.findIndex((e) => e.id == id); 
    if (index !== -1) {
      if(carts[index].products.findIndex((e) => e.id == req.body.id) === -1){
        carts[index].products.push(req.body);
        await data.update(carts, id);
        res.status(200).json('Producto agregado con éxito');
      } else{
        res.status(200).json('Producto ya está agregado en el carrito');
      }
    } else {
      res.status(404).json({ error : 'Carrito no encontrado' })
    }
  } 
  catch(err){
    console.log("error", err);
  };
};

deleteProductFromCart = async (req, res) => {
  try{
    const id_cart = req.params.id;
    const id_prod = req.params.id_prod;
    const carts = await data.getAll();
    let index = carts.findIndex((e) => e.id == id_cart); 
    if (index !== -1) {
      carts[index].products = carts[index].products.filter(p => p.id != id_prod);
      await data.update(carts, id_cart);
      res.json('Carrito actualizado con éxito');
    } else {
      res.status(404).json({ error : 'Carrito no encontrado' })
    }
  } 
  catch(err){
    console.log("error", err);
  };
};

module.exports = {
  createCart,
  deleteCart,
  getCartProducs,
  addProductToCart,
  deleteProductFromCart
};