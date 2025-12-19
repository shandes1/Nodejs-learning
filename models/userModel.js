const mongoose= require("mongoose")
const schema = mongoose.Schema  //class

const userSchema = new schema({
    name: String,
    email: String,
    password: String
}) //object

// table creation
const User =mongoose.model("User",userSchema)  
module.exports= User


// blog --> title,subtitle,description