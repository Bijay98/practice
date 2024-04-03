const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));


const Users=mongoose.model('User',{
    FirstName:String,
    LastName:String,
    Email:String,
    Mobile:Number
})

app.get('/dealer',async(req,res)=>{
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


app.get('/',(req,res)=>{
    res.send("hello Bijay i hope you enjoy it!");
})

app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("Database connected succesfully");})
    .catch(err=>console.log(err))   
    console.log("server is running on port 3000");
})

