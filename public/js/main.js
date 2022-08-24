const socket = io();

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("products", (products) => {
  fetch("http://localhost:3000/products.hbs")
    .then((res) => res.text())
    .then((text) => {
      const template = Handlebars.compile(text);
      const html = template({ products: products });

      document.getElementById("products").innerHTML = html;
    });
});

socket.on("update-messages", (getMessages) => {
  document.getElementById("msg").innerHTML = "";
  getMessages
    .forEach((msg) => createMessage(msg));
});

socket.on("new-message", (msg) => {
  createMessage(msg);
});

createMessage = (msg) => {
  document.getElementById("msg").innerHTML += `
    <div class="bg-Light">
      <b class="text-primary">${msg.message_email}</b> <span class="text-dark">(${msg.message_date}): </span>
      <span class="text-success">${msg.message_content}</span>
    </div>
  `;
};

sendMessage = () => {
  const message_email = document.getElementById("message_email").value;
  const message_content = document.getElementById("message_content").value;
  socket.emit("post-message", { message_email, message_content });
};