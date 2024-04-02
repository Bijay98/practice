const express=require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

const Users=mongoose.model('Users',{
    name:String,
    email:String,
    class:Number
})

app.get("/",(req,res)=>{
    res.send("welcome again you coder")
})

app.get('/users',async(req,res)=>{
   try{
    const users=await User.find()
    res.json({
        status:"sucess",
        data:users
    })
   }
   catch(error){
    res.json({
        status:"failed",
        message:"something went wrong",

    })
   }
});

app.listen(process.env.PORT,()=>{
      mongoose.connect(process.env.MONGODB_URL)
      .then(()=>console.log("Database connected sucessfully"))
      .catch((error)=>console.log(error))
})