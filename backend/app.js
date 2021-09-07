const express = require('express');

const app = express();

app.use((req, res, next)=> {
    console.log('hello')
    next()
});

app.use((req, res, next)=> {
    res.send('Second hello')
   
});

module.exports = app