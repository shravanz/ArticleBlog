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
  req.checkBody('title','Please enter the Title').notEmpty();
  req.checkBody('author','Please enter the Author').notEmpty();
  req.checkBody('body','Please enter the Body').notEmpty();

  //Get Errors
  let errors = req.getValidationResult();
  if(errors){
    res.render('add',{
      someVar:'Add Article',
      errors:errors
    });
  }else{
    let refArticle = new Article();
    refArticle.title = req.body.title;
    refArticle.author = req.body.author;
    refArticle.body = req.body.body;
    refArticle.save((err)=>{
      if (err) {
        console.log(err);
      }else {
        req.flash('success','Article Added');
        res.redirect('/');
      }
    });
  }

})
//Load single Article route For Edit
.get('/article/edit/:_id',(req,res)=>{
  Article.findById(req.params._id,(err,singleArticle)=>{
      res.render('edit_article',{
        title:'Edit Article',
       singleArticle:singleArticle
    });
  });
})
//Update single Article
.post('/article/edit/:_id',(req,res)=>{
  let refArticle ={};
  refArticle.title = req.body.title;
  refArticle.author = req.body.author;
  refArticle.body = req.body.body;
 let query = {_id:req.params._id};

  Article.update(query,refArticle,(err)=>{
    if (err) {
      console.log(err);
    }else {
      req.flash('success','Article Updated');
      res.redirect('/');
    }
  });
})
//Deleting single Artile
.delete('/article/delete/:_id',(req,res)=>{
   let query = {_id:req.params._id};
   Article.remove(query,(err)=>{
     if (err) {
       console.log(err);
     }
     res.send('success');
   })
});

module.exports = router
