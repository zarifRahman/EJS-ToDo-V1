// jshint esversion : 6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
console.log("date",date); //date is an object

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded ({extended : true}));
app.use(express.static("public"));

let todoArray = ['Buy Food','Cook food','Eat food'];
let workArray = [];

app.get("/", function(req,res){
  const day = date.getDay();
  res.render('list',{findDay :day,
                    newTodoVal : todoArray
  })
});

app.get("/work", function(req,res){
  res.render('list', { findDay : "Work", newTodoVal : workArray})
})

//---about page--for demo
app.get("/about",function(req,res){
  res.render('about');
})

app.post("/", function(req,res){
  console.log(req.body);
  const buttonValue = req.body.button;
  if(buttonValue === 'Work'){
    const newValue = req.body.submitValue;
    workArray.push(newValue);
    res.redirect("/work");
  }else{
    const newValue = req.body.submitValue;
    todoArray.push(newValue);
    res.redirect("/");
  }
})


app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
