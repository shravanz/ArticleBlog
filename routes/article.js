const express = require('express');
const router = express.Router();
let Article = require('../models/article')

router
//get  request routes
.get('/addArticle',(req,res)=>{
  res.render('add'  ,{
    someVar:'Add Articles'
  });
})
//get a single Article route
.get('/article/:_id',(req,res)=>{
  Article.findById(req.params._id,(err,singleArticle)=>{
      res.render('article',{
       singleArticle:singleArticle
    });
  });
})
//post request routes
.post('/addArticle',(req,res)=>{
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

module.exports = router
