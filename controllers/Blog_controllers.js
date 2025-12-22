exports.blog_create =  async function(req,res){
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
}


exports.blog_delete= async function(req,res){
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.json({
        message: "Blog id deleted succesfully!!"
    })
}


exports.fetch_blog=async function(req,res){
    const blog= await Blog.find()
    res.json({
        blog
    })
}

exports.fetch_single_blog =  async function(req,res){
     const id = req.params.id
     const data= await Blog.findById(id).select("-__v")
     res.json({
        data:data
     })
}


exports.update_blog= async function(req,res) {
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
}