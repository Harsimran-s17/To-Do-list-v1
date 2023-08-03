//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

let tasks = ["JavaScript", "Aptitude"];
let workItems = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // to serve files statically such as .css files etc. as express don't figure out any directory other than view

app.set('view engine','ejs');

app.get("/", function(req,res){
    
    let day = date();
    
    // res.send("<h1>Hello      <br></h1>Hello");
    //res.write("hello");
    // res.write("World");
    // res.sendFile(__dirname + "/index.html");

    // res.render(__dirname +"/views/list.ejs",{
    //     day: today.getDay()
    // });

    // Or it express by itself look for views folder and we simply write as following
    res.render("list",{
        listTitle: day,
        items: tasks
    });


});

app.get("/work", function(req,res){
    res.render("list", {listTitle:"Work", items: workItems})
})


app.post("/", (req, res, next)=>{
    const ele = req.body.AddTask;
    if(req.body.list === "Work") {
        let item = req.body.AddTask;
        workItems.push(item);
        res.redirect("/work");
    }
    tasks.push(ele);
    console.log(tasks);
    res.redirect("/");

    
})





app.listen(3000,function(){
    console.log("Server started on port 3000");
});