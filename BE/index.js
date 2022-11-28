require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

const account_groupModel = require("./models/account_groupModel")

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// --- Middlewares --- //
app.use(cors());

require('./middlewares/passport')(app);

// ------------------ //

// --- Route --- //

app.use('/', require("./routes/routes"));

app.listen(port, () => {
  console.log(`Backend app listening on port http://localhost:${port}/`);
})