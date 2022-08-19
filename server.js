const routerProducts = require('./routes/products');
const routerCarts = require('./routes/cart');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin: '*' }));
app.use(express.static("public"))

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use((req, res) => {
  const response = {
    error: -2,
    descripcion: `${req.url} ${req.method} no implementado`
  };
  res.status(404).json(response);
});

const server = app.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`);
});

server.on("Error", (error) => console.error(error));