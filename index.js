require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const customersRoutes = require("./routes/customers-routes");
app.use("/api/customers", customersRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on PORT: ${port}`));
