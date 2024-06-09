//  const userService = require('./user.js')

const express = require('express');
const bodyParder = require('body-parser');
const UserServices = require('./user.js');
const app = express();
const port = 1000;

app.get('/',(req,res)=>{
    res.send("Home screen");
});

// profile route
app.get('/profile',(req,res)=>{
    res.send("Profile screen");
});

// login route
app.get('/login',(req,res)=>{
    res.send('Login Screen');
})

// parameters with route

app.get('/login/:id',(req,res)=>{
    res.send("this is your "+req.params.id);
})

// data with body
app.use(bodyParder.json());
app.post('/register',(req,res)=>{
    res.send('This is body '+JSON.stringify(req.body));
})



function startServer(){
    app.listen(port,()=>{
        console.log('server is running on port 1000');
    });
}

// startServer();

let userService = new UserServices();

userService.getUsers();
userService.addUser();
userService.updateUser();
userService.deleteUser();
userService.startUserServer();
