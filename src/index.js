require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const cors = require("cors");

app.use(express.json());

const authentication = require("./routes/authentication");
const bookShelf = require("./routes/bookShelfManagement");
const volume = require("./routes/volume");

// Adding out routes
app.use("/api/auth", authentication);
app.use("/api/bookshelf", bookShelf);
app.use("/api/volume", volume);

// Conecting to mongo db using enviorment var
mongoose.connect(process.env.db_connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
