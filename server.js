const routerProducts = require('./routes/products');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const Contenedor = require("./Contenedor");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))

const hbs = handlebars.create({
  helpers: {
    isdefined: function (value) { return value !== undefined;}
  },
  extname: ".hbs",
  defaultLayout: "index",
  layoutsDir: __dirname + "/views/layout",
  partialsDir: __dirname + "/views/partials"
});

app.engine("hbs", hbs.engine);
app.set('views', "./views");
app.set("view engine", "hbs");

let contenedor = new Contenedor("product");
let contenedor2 = new Contenedor("message");

io.on("connection", async (socket) => {

  io.emit("update-messages", await contenedor2.getAll());

  socket.emit("products", await contenedor.getAll());

  socket.on("post-message", async (msg) => {
    const message = {
      ...msg,
      message_socket_id: socket.id
    };
    await contenedor2.save(message);

    io.emit("update-messages", await contenedor2.getAll());
  });
});

app.get('/',(req, res) =>{
  res.render('main');
});

app.use("/products", routerProducts);

server.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`)
});

server.on("Error", (error) => console.error(error));