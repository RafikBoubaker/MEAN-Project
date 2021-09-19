const express = require('express');
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/postsDB", { useNewUrlParser: true })

const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.log('connected to database'))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept , Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});



app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app