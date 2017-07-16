const express = require('express');
const router = express.Router();
let Article = require('../models/article')

router

//Home Route
  .get('/',(req,res) => {
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


module.exports = router
