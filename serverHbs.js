const routerProducts = require('./routes/products');
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))
app.use("/products", routerProducts);

const hbs = handlebars.create({
  helpers: {
    isdefined: function (value) { return value !== undefined;}
  },
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/public/hbs/views/layout",
});

app.engine("hbs", hbs.engine);
app.set('views', "./public/hbs/views");
app.set("view engine", "hbs");

app.get('/',(req, res) =>{
  res.render('form');
});

const server = app.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`)
});

server.on("Error", (error) => console.error(error));