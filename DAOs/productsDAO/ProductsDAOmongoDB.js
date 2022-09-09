const MongoDBContainer = require('../../containers/MongoDBContainer')

class ProductsDAOmongoDB extends MongoDBContainer {
  constructor(file) {
    super(file)
  }
}

module.exports = ProductsDAOmongoDB