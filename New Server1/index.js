const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

const Users=mongoose.model('Users',{
    name:String,
    email:String,
    class:Number
})

app.get('/users',async(req, res) => {
    try{
        const users=await Users.find()
        // res.render('users',{users})
        res.json({
            status:"Success",   
            data:users
        });
    }
    catch(err){
         res.status(500).json({
            status:"Failed",
            message:"something went wrong"
         })
    }
})
app.post('/users',async(req, res) => {
    const{fisrtName,email,classNumber}=req.body;
    try{
        await Users.create({
            name,
            email,
            classNumber:3
        })
        res.json({status:"Success"})
    }
    catch(err){
        res.status(500).json({
            status:"Failed",
            message:"something went wrong"
         })
    }
})
app.get('/', (req, res) => {
    res.send("hii once again hello");
})

app.listen(process.env.PORT, () => {

    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("DB connected sucessfully"))
        .catch((error) => console.log(error))
})