//module dependencies
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//set public folder
app.use(express.static(path.join(__dirname,'public')));

//connection to MongoDb
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/article');
let db = mongoose.connection;

//check connection
db.once('open',()=>{
  console.log('connected to MongoDb');
});
//check for dbError
db.on('error',(err)=>{
  console.log(err);
});

//Load the Template Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Loading the Routes
const index = require('./routes/index');
const article = require('./routes/article');
app.use('/',index);
app.use('/',article)

//NodeServer listeninig to Port 3000
app.listen(3000,()=>{
  console.log('server start at port 3000');
});
