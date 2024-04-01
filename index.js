// const express=require('express');
// const app=express();
// const bodyParser=require('body-parser');
// const path=require('path');
// const port=8080;

// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
// // app.get('/', (req, res) => {
// //     // res.render('index' );
// //     console.log(res);
// // })

// app.get('/',(req, res) => {
//     res.send("welcome to my server");
// })
// app.post('/login', (req, res) => {
//      res.sendFile(__dirname+"index.html");
    
// });
// app.listen(port,()=>{
//     console.log(`server is running  at ${port}`);
// })
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var isAuthorized = false;

const checkAuthozation=(req,res,next)=>{
   const password=req.body['password'];
   if(password=="papun") {
     isAuthorized = true;  
  }
  next();
}

app.use(checkAuthozation); 

app.get('/', (req, res) => {
   res.redirect('/test');

});
app.get('/test', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});
app.post('/login',(req, res) => {
    if(isAuthorized){
      res.sendFile(__dirname + '/gotit.html');
    }
    else{
        res.sendFile(__dirname + '/unOthorise.html');
    }
    console.log(req.body);
})






// app.get('/', (req, res) => {
//     res.send("Welcome to my server");
// });

// app.get('/data',(req, res) => {
//     res.sendFile(__dirname + '/index.html');
    
// })
// // GET route for /login
// // app.get('/login', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'index.html'));
    
// // });

// // // POST route for /login
// // app.post('/login', (req, res) => {
// //     // Handle login logic here
// //     console.log(res.body);
// // });

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
