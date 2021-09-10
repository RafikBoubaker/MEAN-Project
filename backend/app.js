const express = require('express');

const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require('./models/post')

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.post('/api/posts',(req, res,next)=> {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
})
  console.log(post)
  post.save()
res.status(201).send({message:'post added'})

})



app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});


module.exports = app