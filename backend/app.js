const express = require('express');

const app = express();
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/postsDB", { useNewUrlParser: true })

const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.log('connected to database'))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});



app.use("/api/posts", postsRoutes);


module.exports = app