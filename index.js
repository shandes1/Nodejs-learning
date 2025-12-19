// npm init--> to start 
// package.json is created
// npm install express





// always needed
const express = require("express")
const dbSangaConnection = require("./database/connection")
const User = require("./models/userModel")
const Blog = require("./models/blogModel")
const app= express()

// data base
 dbSangaConnection()
// tables



app.get("/",function(request,response){       // "/" is a Route/API   //client--request server-->fulfill request
    response.json({
        name: "home page"
    })                                     // when client request / then it print hello world as a response
})                                   

app.get("/about",function(req,res){                      //get,post,put,patch,delete-->http method ,http verbs
    res.json({
        name: "sandesh",
        address: "Gaighat",
        age: 23
    })                          // "/about" is an api
})


// user
app.get("/fetch-users",async function(req,res){
    const data = await User.find()
    res.json({
        data // data: data
    }) 
})

// Blog
app.get("/fetch-blog", async function(req,res){
    const blog= await Blog.find()
    res.json({
        blog
    })
})


app.listen(3000,function(){ //callback function --function as a parameter  //listen-->method
    console.log("server has started at port 3000")
})  // this will book a port for us to use


// orm tool is mongoose it connect server with databases 
// to install it  use npm install mongoose
// mongodb+srv://sandesh:<db_password>@cluster0.hh2ueat.mongodb.net/?appName=Cluster0  --> connection string

// ip whitelist error occur if switch wifi to different one

