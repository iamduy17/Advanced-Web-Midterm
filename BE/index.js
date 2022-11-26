require('dotenv').config();
const {CLIENT_URL} = require("./config/index");
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// --- Middlewares --- //
console.log(CLIENT_URL);
app.use(cors({
  origin: CLIENT_URL,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));    

require('./middlewares/passport')(app);

// ------------------ //

// --- Route --- //

app.use('/', require("./routes/routes"));

// ------------ //

app.listen(port, () => {
  console.log(`Backend app listening on port http://localhost:${port}/`);
})