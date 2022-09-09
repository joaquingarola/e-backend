const Firebase = require("../../containers/FirebaseContainer");

class CartsDAOFirebase extends Firebase {
  constructor() {
    super('carts');
  }
}

module.exports = CartsDAOFirebase;