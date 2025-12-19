const mongoose= require("mongoose")
const Schema = mongoose.schema  //class

const userSchema = new schema({
    name: String,
    email: String,
    password: String
}) //object

// table creation
const User =mongoose.model("User",userSchema)  
module.exports= User


// blog --> title,subtitle,description