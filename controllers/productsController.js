const data = require('../DAOs').productsDAO;

getProducts = async (req, res) => {
  try{
    let prods = await data.getAll();
    res.json(prods);
  } 
  catch(err){
    console.log("error", err);
  };
}

getProductById = async (req, res) => {
  try{
    const id = req.params.id;
    let prod = await data.getById(id);
    if(prod === undefined){
      res.status(404).json({ error : 'producto no encontrado' })
    }
    res.json(prod);
  } 
  catch(err){
    console.log(err);
  }
};

addProduct =  async (req, res) => {
  try {
    const add = req.body;
    let id = await data.save(add);
    res.status(201).json(`Producto creado con id ${id}`)
  } catch (e) {
    console.error(e);
  }
};

updateProduct= async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const prods = await data.getAll();
    let index = prods.findIndex((e) => e.id == id); 
    if (index !== -1) {
      if (update.name)
        prods[index].name = update.name;
      if (update.price)
        prods[index].price = update.price;
      if (update.code)
        prods[index].code = update.code;
      if (update.thumbnail)
        prods[index].thumbnail = update.thumbnail;
      if (update.description)
        prods[index].description = update.description;
      if (update.stock)
        prods[index].stock = update.stock;
      await data.update(prods, id);
      res.json('Producto actualizado con éxito');
    } else {
      res.status(404).json({ error : 'Producto no encontrado' })
    }
  } catch (e) {
    console.error(e);
  };
};

deleteProductById = async (req, res) => {
  try{
    const id = req.params.id;
    let response = await data.deleteById(id);
    if(response !== 0){
      res.json(`Se ha eliminado con éxito el producto con ID: ${response}`);
    } else{
      res.status(404).json({ error : 'Producto no encontrado' })
    }
  } catch (e) {
    console.error(e);
  };
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById
};