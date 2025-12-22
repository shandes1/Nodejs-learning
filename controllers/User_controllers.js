const jwt= require("jsonwebtoken")  // jwt hunalai -> ey bata start , 3 section ma divide bhako hunxa  1st->algorithm,2nd-> payload(data) , 3rd-> signature(k bata lock gareko xa)
const User= require("../models/userModel")
const bcrypt = require('bcrypt')
require("dotenv").config()


exports.homePage=(request,response)=>{      
    response.json({
        name: "home page"
    })                                     // when client request / then it print hello world as a response
}


exports.about=(req,res)=>{                      //get,post,put,patch,delete-->http method ,http verbs
    res.json({
        name: "sandesh",
        address: "Gaighat",
        age: 23
    })                          // "/about" is an api
}

exports.fetch_user= async(req,res)=>{
    const data = await User.find()
    res.json({
        data // data: data
    }) 
}



exports.user_register= async(req,res)=>{  //post->send request
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
}

exports.delete_User= async (req,res)=>{  
    const id= req.params.id
    await User.findByIdAndDelete(id)
    res.json({
        message: "Userr with that id deleted successfully !!"
    })
}



exports.fetch_single_user=async (req,res)=>{
    const id = req.params.id
    const data = await User.findById(id).select(["-password","-__v"])  //this exclude password --> j lai na pathaune teslai --ve lekne  
                                                                        //select take only one arg so we make array
    res.json({
        data:data
    })
}

exports.update_user = async (req,res)=>{
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
}

exports.login =  async (req,res) => {
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
        token=jwt.sign({id: data.__id},process.env.JWT_SECRAT, {expiresIn:"1d"})

        res.json({
            message: "Login successfull!!",
            token :token
        })
       }else{
        res.json({
            message: "Password invalid"
        })
       }
    }
}