const Firebase = require("../../containers/FirebaseContainer");

class ProductsDAOFirebase extends Firebase {
  constructor() {
    super('products');
  }
}

module.exports = ProductsDAOFirebase;