require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const socket = require("./socket/socket");

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
socket.startSocketServer(server);

server.listen(port, () => {
  console.log(`Backend app listening on port http://localhost:${port}/`);
});
