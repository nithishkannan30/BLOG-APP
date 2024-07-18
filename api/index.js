const express = require('express');
const cors=require('cors');
const app = express();
const mongoose=require('mongoose');
const bcrypt =require('bcryptjs');
const User=require('./models/User');
const jwt=require('jsonwebtoken');

app.use(express.json());

mongoose.connect('mongodb+srv://nithishkannann:Nithish%4030@cluster0.cltf5nc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const salt=bcrypt.genSaltSync(10);
const secret='jkgwqrkosdaLKLP2320034JK';
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.post('/register', async(req, res) => {
    const {username,password}=req.body;
    try{
    const userDoc=await User.create({
         username,
         password:bcrypt.hashSync(password,salt) 
    });
    res.json(userDoc);
    }
    catch(e){
        res.status(400).json(e);
    }
    
});

app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const userDoc=await User.findOne({username});
    const passOk=bcrypt.compareSync(password,userDoc.password);
    if(passOk){
        jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
              if(err) throw err;
              res.cookie('token',token).json('ok');
        })

    }else{
       res.status(400).json('wrong credentials');
    }

    res.json(passOk);
})
app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
// mongodb+srv://nithishkannann:Nithish@30@cluster0.cltf5nc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0