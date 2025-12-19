const mongoose= require("mongoose")
const schema= mongoose.schema  // class ho yo

// table names --> k k hunxa table ma
const blogSchema= new schema({    //object ho yo
    title: String,
    subtitle: String,
    describtion: String,
})

// table
const Blog= mongoose.model("Blog",blogSchema)
module.exports= Blog