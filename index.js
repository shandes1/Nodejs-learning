// always needed
const express = require("express")
const app= express()

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


app.listen(3000,function(){ //callback function --function as a parameter  //listen-->method
    console.log("server has started at port 3000")
})  // this will book a port for us to use
