// npm init--> to start 
// package.json is created
// npm install express





// always needed
const express = require("express")
const dbSangaConnection = require("./database/connection")
const User = require("./models/userModel")
const Blog = require("./models/blogModel")
const bcrypt = require('bcrypt')
const app= express()

//this allow node to read json data
app.use(express.json())



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

app.post("/register",async function(req,res){  //post->send request
    const name= req.body.name
    const email= req.body.email
    const password= req.body.password

    // or we can use
    // const {naem,email,password}= req.body

    console.log(name,email,password)

    // kai halnu xa bane create use garne 
    await User.create({
        name: name,
        email: email,
        password: bcrypt.hashSync(password,10)  //10--> salt 

    })
    res.json({
        message: "User registered successful!!"
    })
})


app.delete("/delete/:id", async function(req,res){  // ":"-> yo bhayo bhane paxi k xa bal hudaina natra same to same halnu para
    const id= req.params.id
    await User.findByIdAndDelete(id)
    res.json({
        message: "Userr with that id deleted successfully !!"
    })
})

app.delete("/delete", async function(req,res){

    const id = req.body.id
    await User.findByIdAndDelete(id)
    res.json({
        message: "user id deleted succesfully!!"
    })
})


app.listen(3000,function(){ //callback function --function as a parameter  //listen-->method
    console.log("server has started at port 3000")
})  // this will book a port for us to use


// orm tool is mongoose it connect server with databases 
// to install it  use npm install mongoose
// mongodb+srv://sandesh:<db_password>@cluster0.hh2ueat.mongodb.net/?appName=Cluster0  --> connection string

// ip whitelist error occur if switch wifi to different one





// blog create and delete banaune
app.post("/blog-create", async function(req,res){
    const {title,subtitle,description} = req.body

    console.log(title,subtitle,description)

    await Blog.create({
        title: title,
        subtitle: subtitle,
        description: describtion
    })

    res.json({
        message: "blog created successfully!!"
    })
})

// blog delete 
app.delete("/blog-delete", async function(req,res){
    const id = req.body.id
    await Blog.findByIdAndDelete(id)
    res.json({
        message: "Blog id deleted succesfully!!"
    })
})