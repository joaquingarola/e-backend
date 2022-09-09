const MongoDBContainer = require('../../containers/MongoDBContainer')

class CartsDAOmongoDB extends MongoDBContainer {
  constructor(Cart) {
    super(Cart)
  }
}

module.exports = CartsDAOmongoDB