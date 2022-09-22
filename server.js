const routerTest = require('./routes/test.js');
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

const session = require('express-session')
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))
app.use(session({
  //Base de datos Mongo
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@coder.nrxnhkn.mongodb.net/ecommerce?retryWrites=true&w=majority`,
    mongoOptions: advancedOptions,
    ttl: 60,
    retries: 0
  }),
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));

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
  try {
    if (req.session.user) {
      res.render('main');
    } else {
      res.render('login');
    }
  } catch (err) {
      console.log(err);
  }
});

app.post('/login', (req, res) => {
  req.session.user = req.body.user;
  res.redirect('/');
});

app.get('/login', (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    res.send({ user })
  } else {
    res.send({ userName: 'No existe' })
  }
});

app.get('/logout', (req, res) => {
  const user = req.session.user;
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.render('logout', {user: user});
    }
  });
});

app.use("/api/products-test", routerTest);

server.listen(PORT, ()=> {
  console.log(`Servidor en puerto: ${PORT}`);
});

server.on("Error", (error) => console.error(error));