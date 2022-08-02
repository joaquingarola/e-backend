const routerProducts = require('./routes/products');
const express = require('express');
const ejs = require('ejs');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))
app.use("/products", routerProducts);

app.set('view engine', 'ejs');
app.set('views', './public/ejs/views');

app.get('/',(req, res) =>{
  res.render('index');
});

const server = app.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`)
});

server.on("Error", (error) => console.error(error));