const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const User = require('./auth_model');
const bcrypt = require('bcryptjs');
const JWTToken = require('./jwt_token')
const jwtToken = new JWTToken();

mongoose.connect('mongodb://localhost:27017/admin');

mongoose.connection.once('open', () => {
    console.log('Server connected');
});

app.use(bodyParser.json());

app.get('/users', async (req, res) => {
    try {
        var users = await User.find();
        res.status(200).json({ status: "success", "users": users });
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
})

app.post('/register', async (req, res) => {
    try {
        const {email} = req.body;
        const exitingUser = User.findOne({email});
        if(exitingUser) return res.status(400).json({message:"Email already exists"});
        let newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        let cPass = await bcrypt.compare(password,user.password);

        if (!user || !cPass) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwtToken.generateJWT(user.id);
        res.status(200).json({status: "Success",token:token, data: user });

    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

app.post('/generateJWT',async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message:"Email not found"});
    const code = await bcrypt.compare(password,user.password);
    if(!code) return res.status(400).json({message:"Password invalid"});

    const token = jwtToken.generateJWT(user.id);
    // console.log(token);
    res.status(200).json({status:"Success",token:token});
})

app.listen(port, () => {
    console.log("server is running on " + port);
})


// const bcrypt = require('bcryptjs');

// const myPass = "123AS";
// let hasPass;

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(myPass,salt,(e,hash)=>{
//         if(e){
//             console.log("this is "+e);
//         }

//         hasPass = hash
//         console.log(hash);

//     })
// })
