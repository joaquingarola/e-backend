const routerTest = require('./routes/test');
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const dotenv = require("dotenv");
dotenv.config();

const connectToMongoDB = require('./mongoDB/index');
const { normalizeMsg } = require('./normalizr.js')
const { MsgModel } = require("./mongoDB/schemas/message");
const Contenedor = require("./Contenedor");
const PORT = 8000;

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

let contenedor = new Contenedor(MsgModel);

connectToMongoDB()
  .then(() => console.log('Conectado con éxito a la base de datos'))
  .catch((err) => console.log(`Error: ${err}`))

io.on("connection", async (socket) => {

  const message = await contenedor.getAll();
  io.emit("update-messages", normalizeMsg(message));

  socket.emit("products");

  socket.on("post-message", async (msg) => {
    await contenedor.save(msg);
    const message = await contenedor.getAll();
    io.emit("update-messages", normalizeMsg(message));
  });
});

app.get('/',(req, res) =>{
  res.render('main');
});

app.use("/api/products-test", routerTest);

server.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`);
});

server.on("Error", (error) => console.error(error));