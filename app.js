//module dependencies
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

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

//Express session Middleware
app.use(session({
  secret:'wumap.jaw1',
  resave:true,
  saveUninitialized:true,
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Loading the Routes
const index = require('./routes/index');
const article = require('./routes/article');
app.use('/',index);
app.use('/',article)

//NodeServer listeninig to Port 3000
app.listen(3000,()=>{
  console.log('server start at port 3000');
});
