require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// --- Middlewares --- //
app.use(cors());

require("./middlewares/passport")(app);

// ------------------ //

// --- Route --- //

app.use("/", require("./routes/routes"));

io.on("connect", (socket) => {
  console.log("socket abc", socket.id);
  socket.on("submit", (data) => {
    console.log("abcdef");
    io.sockets.emit("received submit", data);
    //socket.emit("received submit", data)
  });
});
server.listen(port, () => {
  console.log(`Backend app listening on port http://localhost:${port}/`);
});
