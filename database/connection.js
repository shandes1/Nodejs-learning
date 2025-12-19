const mongoose= require("mongoose")

async function  dbSangaConnection(){ //camel case--> yesma 1st word sab sano aaru ko 1st letter capital
    await mongoose.connect("mongodb+srv://sandesh:basnet@cluster0.hh2ueat.mongodb.net/?appName=Cluster0")
    console.log("Connected succesfully!!")
}

// Async Await--> db connect and db query garne code ma await halnu parxa --> time  lagne bhako leee 
// Async start of func ma halne

// for import we use require  for export we use module.exports
module.exports = dbSangaConnection 