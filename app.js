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

// Bring in Models
let Article = require('./models/article')

//Home Route
app.get('/',(req,res) => {
  // let articles = [
  //   {
  //     id:'1',
  //     title:'Article One',
  //     author:'shravanz',
  //     body:'This is Article One Bitch!!'
  //   },
  //   {
  //     id:'2',
  //     title:'Article Two',
  //     author:'shravanz',
  //     body:'This is Article Two Bitch!!'
  //   },
  //   {
  //     id:'3',
  //     title:'Article Three',
  //     author:'shravanz',
  //     body:'This is Article Three Bitch!!'
  //   },
  // ];

  Article.find({},(err,allArticles) => {
    if (err) {
      console.log(err);
    }else {
      res.render('index',{
        someVar:'Articles',
        allArticles:allArticles
      });
    }
  });
});

//gets  request routes
app.get('/addArticle',(req,res)=>{
  res.render('add'  ,{
    someVar:'Add Articles'
  });
})
//get a single Article route

app.get('/article/:_id',(req,res)=>{
  Article.findById(req.params._id,(err,singleArticle)=>{
      res.render('article',{
       singleArticle:singleArticle
    });
  });
});

//post request routes
app.post('/addArticle',(req,res)=>{
  let refArticle = new Article();
  refArticle.title = req.body.title;
  refArticle.author = req.body.author;
  refArticle.body = req.body.body;
  refArticle.save((err)=>{
    if (err) {
      console.log(err);
    }else {
      res.redirect('/');
    }
  });
});


app.listen(3000,()=>{
  console.log('server start at port 3000');
});
