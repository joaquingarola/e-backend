const fs = require('fs');
const knex = require('knex');
const knexConfig = require('./knexfile');
const database = knex(knexConfig);

class Contenedor{
  constructor(name) {
    this.tableName = name;
  }

  async save(add){
    try{
      const resultado = await database(this.tableName).insert(add);
      return resultado;
    }
    catch(err){
      console.log("error", err);
    }
  }

  async update(update, id){
    try{
      const result = await database(this.tableName).where(`${this.tableName}_id`, id).update(update);
      return result;
    }
    catch(err){
      console.log("error", err);
    }
  }

  async getById(id){
    try{
      const data = await database(this.tableName).select().where(`${this.tableName}_id`, id);
      return data;
    }
    catch(err){
      console.log(err);
    }
  }

  async getAll(){
    try{
      const data = await database(this.tableName).select();
      return data;
    }
    catch(err){
      console.log("error", err);
    }
  }

  async deleteById(id){
    try{
      await database(this.tableName).where(`${this.tableName}_id`, id).del()
      return 'Eliminado correctamente';
    }
    catch(err){
      console.log("error", err);
    }
  } 
}

module.exports = Contenedor;