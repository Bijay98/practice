const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


//Aunthetication
const isLoggedIn=(req,res,next) =>{

    try{
        const jwtToken=req.headers.token
        let userDetails=jwt.verify(jwtToken,process.env.JWT_PRIVATE_KEY)
        if(!userDetails)
            throw new Error()
            req.User=userDetails
            next()
    }catch(error){
        console.log(error);
        return res.json({
            message:'you are not logged in'
        })
    }
}

//Authorization
const isAdmin=(req,res,next) =>{

    
      if(!req.User.isAdmin)
      return res.json({
        message:'you have not access to this server'
      
    })
    next()
}
const isPremium=(req,res,next) =>{

    
    if(!req.User.isPremium)
    return res.json({
      message:'you are not premium user'
    
  })
  next()
}

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const Users=mongoose.model('User',{
    FullName:String,
    Email:String,
    Password:String,
    isAdmin:Boolean,
    isPremium:Boolean
})

app.get('/users',async(req,res)=>{
    const User=await Users.find()
    try{
        res.json({
            status:"success",
            data:User
        })
    }
    catch(error){
        res.status(500).json({
            status:"failed",
            message:"couldn't find user"
        })
    }
})

app.post('/signup',async(req,res)=>{
    const {FullName,Email,Password,isAdmin,isPremium} = req.body;
    try{
        const User=await Users.findOne({Email});
        if(User){
            return res.json({
                status:"email already registered",
            })
        }
        const encryptedPassword=await bcrypt.hash(Password,10)
        await Users.create(
            {
                FullName,
                Email,
                Password: encryptedPassword,
                isAdmin,
                isPremium
            })
        res.json({
            status:"success",
           
        })
    }
    catch(error){
        res.status(500).json({
            status:"failed",
            message:"couldn't find user"
        })
    }
})
app.post('/login',async(req,res)=>{
    const {Email,Password} = req.body;
    try{
    const User=await Users.findOne({Email});
    if(!User){
        return res.json({
            status:"email not found",
        })
    }
    
        const passwordMatch= bcrypt.compare(Password,User.Password)
       
        if(!passwordMatch){
            return res.json({
                status:"icorrect credentials",
            })
        }
        const jwToken=jwt.sign(User.toJSON(),process.env.JWT_PRIVATE_KEY,{expiresIn:30})
        return res.json({
            status:'log in successful',
            jwToken,
        })
    }
    
    catch(error){
        console.log(error);
        res.status(500).json({
            status:"failed",
            message:"couldn't find user"
        })
    }
})

//private routes
app.get('/profile',isLoggedIn,async(req,res)=>{
   
    try{
        res.json({
            status:"/profile Page",
           
        })
    }
    catch(error){
        
        res.status(500).json({
            status:"failed",
            message:"couldn't find user"
        })
    }
})
app.get('/admin/dashboard',isLoggedIn,isAdmin,async(req,res)=>{
   
    try{
        res.json({
            status:"welcome admin",
           
        })
    }
    catch(error){
        
        res.status(500).json({
            status:"failed",
            message:"couldn't find user"
        })
    }
})
app.get('/premium/dashboard',isLoggedIn,isPremium,async(req,res)=>{
   
    try{
        res.json({
            status:"premium content",
           
        })
    }
    catch(error){
        
        res.status(500).json({
            status:"failed",
            message:"couldn't find user"
        })
    }
})


app.get('/',(req,res)=>{
    res.send("hello Bijay i hope you enjoy it!");
})

app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("Database connected succesfully");})
    .catch(err=>console.log(err))   
    console.log(`server connected succesfully`);
})