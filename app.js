//module dependencies
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');


//connection to MongoDb
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
        someVar:'articles',
        allArticles:allArticles
      });
    }

  });



});

//Addition routes
app.get('/addArticle',(req,res)=>{
  res.render('add'  ,{
    someVar:'Add Articles'
  });
})

app.listen(3000,()=>{
  console.log('server start at port 3000');
});
