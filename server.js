const mongoose = require ('mongoose')
const user = require ('./src/user/userRouter')
const volume = require ('./src/volume/volumeRouter')
const shelf = require ('./src/bookShelf/bookShelfRouter')
const express = require('express');
const cors = require ('cors')
const app = express();
const port = 5000;
mongoose.connect('mongodb://127.0.0.1:27017/Turing');
const corsOptions = {
  origin: '*', //to allow forntend and backend on same computer
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));

app.use ('/user', user);
app.use ('/volume', volume);
app.use ('/shelf', shelf)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});