const { Types } = require('mongoose')

class MongoDBcontainer {
  constructor(Schema) {
      this.Schema = Schema
  }

  async save (object){
    try {
      const obj = await new this.Schema(object).save()
      return obj.id
    } catch (err) {
      console.log(err)
    }
  }

  async update(data, id) {
    try {
      id = Types.ObjectId(id)
      const item = data.find(e => e.id == id);
      await this.Schema.replaceOne({_id: id}, item)
    } catch (err) {
      console.log(err)
    }
  }

  async getById(id) {
    try {
      id = Types.ObjectId(id)
      const element = await this.Schema.findOne({_id: id})
      if (element) {
          return element
      }
      else {
          return undefined
      }
    } catch (err) {
      console.error(err)
    }
  }

  async getAll() {
    try {
      return await this.Schema.find()
    } catch (err) {
      console.error(err)
    }
  }

  async deleteById(id) {
    try {
      id = Types.ObjectId(id)
      const success = await this.Schema.deleteOne({_id: id})
      if (success.deletedCount > 0) {
          return id
      } else {
          return 0
      }
    } catch (err) {
      console.error(err)
    }
  }

  async deleteAll() {
    try {
      this.Schema.remove({})
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = MongoDBcontainer