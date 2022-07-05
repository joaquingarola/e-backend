const fs = require('fs');

class Contenedor{
  constructor(file) {
    this.file = file;
  }

  async save(prod){
    try{
      const data = await fs.promises.readFile(`./files/${this.file}.txt`, 'utf-8');
      const products = (data.length === 0) ? [] : JSON.parse(data);
      let id = products.length ? products[products.length-1].id+1 : 1;
      
      products.push({...prod, id: id});
      await fs.promises.writeFile(`./files/${this.file}.txt`, JSON.stringify(products));
      console.log("Producto agregado con éxito");
    }
    catch(err){
      console.log("error", err);
    }
  }

  async getById(id){
    try{
      const data = await fs.promises.readFile(`./files/${this.file}.txt`, 'utf-8');
      console.log(JSON.parse(data).find(p => p.id === id));
    }
    catch(err){
      console.log("error", err);
    }
  }

  async getAll(){
    try{
      const data = await fs.promises.readFile(`./files/${this.file}.txt`, 'utf-8');
      console.log(JSON.parse(data));
    }
    catch(err){
      console.log("error", err);
    }
  }

  async deleteById(id){
    try{
      const data = await fs.promises.readFile(`./files/${this.file}.txt`, 'utf-8');
      const products = JSON.parse(data);
      await fs.promises.writeFile(`./files/${this.file}.txt`, JSON.stringify(products.filter(p => p.id !== id)));
      console.log("Producto eliminado")
    }
    catch(err){
      console.log("error", err);
    }
  } 

  async deleteAll(){
    try{
      await fs.promises.writeFile(`./files/${this.file}.txt`, '');
      console.log("Productos eliminados")
    }
    catch(err){
      console.log("error", err);
    }
  }
}

const test = () => {

  const productos = new Contenedor('Productos');
  const obj1 = {name: 'Café', price: 480, thumbnail: 'https://prod'};
 
  productos.save(obj1);
  /* productos.getAll(); */
  /* productos.getById(1); */
  /* productos.deleteById(1); */
  /* productos.deleteAll(); */
}

test();