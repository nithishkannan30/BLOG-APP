const express = require('express');
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect('mongodb://127.0.0.1:27017/empl');


  const schema=new mongoose.Schema({
    no:String,
    name:String
  })

const user=mongoose.model("userName",schema)
app.post("/data",async(req,res)=>{
    console.log(req.body);
    const {rollNumber,name}=req.body;
    const data=new user({
      no:rollNumber,
      name:name
    })
    const result=await data.save();
    console.log(result);
    res.json({"message":" Form Submitted Successfully"});
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
