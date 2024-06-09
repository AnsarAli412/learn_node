const express = require('express');
const app = express();
const port = 3000;
const bodyParder = require('body-parser');
const mongoes = require('mongoose');
const bodyParser = require('body-parser');


mongoes.connect('mongodb://localhost:27017/admin');

mongoes.connection.once('open',()=>{
    console.log('Connect to MongoDB');
});

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("MongoDb Connected");
});

app.listen(port,()=>{
    console.log('server conneted');
})
