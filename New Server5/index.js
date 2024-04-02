const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
app.use(bodyParser.urlencoded({extended: true}));

const Users = mongoose.model('User', {
    name: String,
    email: String,
    class: Number
});
app.get('/pagals', async (req, res) => {
    try {
        const users = await Users.find();
        res.json({
            status: "success",
            data: users
        })
    }
    catch(err){
        res.json({
            status: 500,
            message:"some thing went wrong"
        })
    }
});
app.post('/users', async (req, res) => {
    const { name, email, classNo } = req.body;
    try {
        await Users.create({
            name,
            email,
            class: classNo
        });
        res.json({
            status: "success"
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Something went wrong"
        });
    }
});

app.get('/', (req, res) => {
    res.send('Hello Bijay Nice to see you again');
})

// app.listen(process.env.PORT, () => {
//     // console.log("listening on http://localhost:7000");
//     mongoose.connect(process.env.MONGODB_URL)
//     .then(()=>{
//         console.log("database connection established");
//     })
//     .error(err=>console.log(err))
// })
app.listen(process.env.PORT, () => {
    console.log("listening on http://localhost:7000");
    mongoose.connect(process.env.MONGODB_URL)
   .then(()=>{console.log("Database connected succesfully");})
   .catch(err=>console.log(err))    
});