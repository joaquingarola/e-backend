const socket = io();

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("products", () => {
  let products;
  fetch('http://localhost:8000/api/products-test')
    .then(res => res.json())
    .then(data => products = data)
  fetch("http://localhost:8000/products.hbs")
    .then((res) => res.text())
    .then((text) => {
      const template = Handlebars.compile(text);
      const html = template({ products: products });

      document.getElementById("products").innerHTML = html;
    });
});

socket.on("update-messages", (getMessages) => {
  document.getElementById("msg").innerHTML = "";
  const denormMsg = denormalizeMsg(getMessages);
  denormMsg
    .forEach((msg) => createMessage(msg));
  renderComp(getMessages, denormMsg);
});

socket.on("new-message", (msg) => {
  createMessage(msg);
});

createMessage = (msg) => {
  let newDate = new Date(msg.timestamp).toLocaleString('es-AR');
  document.getElementById("msg").innerHTML += `
      <div class="card"">
      <div class="container">
        <div class="row">
          <div class="col-2 d-flex align-items-center">
            <img class="card-img" src="${msg.author.avatar}" alt="${msg.author.email}" style="width:72px">
          </div>
          <div class="col-10">
            <div class="card-body">
              <h6 class="card-title">${msg.author.email}</h6>
              <p class="card-text"><small class="text-muted">${newDate}</small>
              <p class="card-text">${msg.text}</p>
            </div>
          </div>
        </div>
    </div>
  `;
};

renderComp = (getMessages, denormMsg) => {
  const comp = document.getElementById("compresion");
  const denormMsgLen = (JSON.stringify(denormMsg)).length;
  const msgLen = (JSON.stringify(getMessages)).length;
  const compresion = ((denormMsgLen - msgLen) / denormMsgLen * 100).toFixed(2);
  comp.innerHTML = `(Compresion: ${compresion}%)`;
}

sendMessage = () => {
  const message = {
    author: {
      email: document.getElementById("email").value,
      name: document.getElementById("name").value,
      lastname: document.getElementById("lastname").value,
      age: document.getElementById("age").value,
      username: document.getElementById("username").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("message").value,
  };
  socket.emit("post-message", message);
};
