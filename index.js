// npm init--> to start 
// package.json is created
// npm install express





// always needed
const express = require("express")
const dbSangaConnection = require("./database/connection")
const User = require("./models/userModel")
const Blog = require("./models/blogModel")
const bcrypt = require('bcrypt')
const {homePage, fetch_user, user_register, about, delete_User, fetch_single_user, update_user, login} = require("./controllers/User_controllers")
const { blog_create ,blog_delete, update_blog, fetch_single_blog, fetch_blog } = require("./controllers/Blog_controllers")

const app= express()

// to operate .env
require("dotenv").config()

//this allow node to read json data
app.use(express.json())



// data base
 dbSangaConnection()
// tables


// home
app.get("/",homePage)           // "/" is a Route/API   //client--request server-->fulfill request                         
app.get("/about",about)


// user
app.get("/fetch-users",fetch_user)
app.post("/user_register",user_register)
app.delete("/delete/:id", delete_User  )  // ":"-> yo bhayo bhane paxi k xa bal hudaina natra same to same halnu para

// Blog
app.get("/fetch-blog", fetch_blog )




app.delete("/delete", async function(req,res){

    const id = req.body.id
    await User.findByIdAndDelete(id)
    res.json({
        message: "user id deleted succesfully!!"
    })
})



// orm tool is mongoose it connect server with databases 
// to install it  use npm install mongoose
// mongodb+srv://sandesh:<db_password>@cluster0.hh2ueat.mongodb.net/?appName=Cluster0  --> connection string

// ip whitelist error occur if switch wifi to different one





// blog create and delete banaune
app.post("/blog-create", blog_create)
 
// blog delete 


app.delete("/blog-delete/:id", blog_delete)

// single data 
app.get("/fetch-single/:id",fetch_single_user)

app.get("/fetch-single-blog/:id",fetch_single_blog)

// Update 
app.patch("/update-user/:id",update_user)


app.patch("/update-blog/:id", update_blog)

// login
app.post("/login", login)


// token generation-> json web token (jwt) package
// token is the identity of the website 


app.listen(3000,function(){ //callback function --function as a parameter  //listen-->method
    console.log("server has   started at port 3000")
})  // this will book a port for us to use
// except start and test for other we use npm run "that_word"

// .env--> 