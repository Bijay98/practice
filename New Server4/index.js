const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

// Define the Users model using Mongoose
const Users = mongoose.model('Users', {
    name: String,
    email: String,
    favnum: Number
});

// Route to fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.render('users', { users }); // Renders the 'users' view with the fetched users
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong"
        });
    }
});

// Sample POST route
app.post('/', (req, res) => {
    res.send("amit is a good boy"); // Responds with a string
});

// Start the server and connect to MongoDB
app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("Database connected successfully"))
        .catch(err => console.error("Error connecting to database:", err));
});
