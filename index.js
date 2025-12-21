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

// to operate .env
require("dotenv").config()

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

app.delete("/blog-delete/:id", async function(req,res){
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.json({
        message: "Blog id deleted succesfully!!"
    })
})

// single data 
app.get("/fetch-single/:id",async function(req,res){
    const id = req.params.id
    const data = await User.findById(id).select(["-password","-__v"])  //this exclude password --> j lai na pathaune teslai --ve lekne  
                                                                        //select take only one arg so we make array
    res.json({
        data:data
    })
})

app.get("/fetch-single-blog/:id", async function(req,res){
     const id = req.params.id
     const data= await Blog.findById(id).select("-__v")
     res.json({
        data:data
     })
})

// Update 
app.patch("/update-user/:id",async function(req,res){
    const id= req.params.id
    const name= req.body.name
    const email = req.body.email
    const password= req.body.password

    await User.findByIdAndUpdate(id,{
        name:name,
        email:email,
        password: bcrypt.hashSync(password,10)
    })

    res.json({
        message: "UPdate data successfully!!"
    })
})


app.patch("/update-blog/:id", async function(req,res) {
    const id=req.params.id
    const title= req.body.title
    const subtitle= req.body.subtitle
    const description= req.body.description

    await Blog.findByIdAndUpdate(id,{
        title:title,
        subtitle: subtitle,
        description: description
    })

    res.json({
        message : "Update blog successfully"
    })
})

// login
app.post("/login", async function (req,res) {
    const email= req.body.email
    const password= req.body.password

    const data = await User.findOne({email:email})
    if(!data){
        res.json({
            messsage: "not rergistered"
        })
    }else{
       const isMatched= bcrypt.compareSync(password,data.password)
       if (isMatched){
        res.json({
            message: "Login successfull!!"
        })
       }else{
        res.json({
            message: "Password invalid"
        })
       }
    }
})



app.listen(3000,function(){ //callback function --function as a parameter  //listen-->method
    console.log("server has started at port 3000")
})  // this will book a port for us to use
// except start and test for other we use npm run "that_word"

// .env--> 