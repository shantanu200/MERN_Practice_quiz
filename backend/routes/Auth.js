import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.post("/register",function(req,res){
    if(!req.body) res.status(500).json("Data not recieved");

    const {username,email,password} = req.body;

    const user = new User({
        username,
        email,
        password
    });

    User.findOne({email:email},function(err,dbuser){
        if(dbuser){
            res.status(200).json("User is Already Available");
        }else{
            user.save().then(()=>{
                res.status(200).json({message:"User is created successfully",user:user});
            }).catch((err) => {
                res.status(500).json(err);
            });
        }
    })
});

router.post("/login",function(req,res){
    if(!req.body) res.status(500).json("Data is not send");

    const {email,password} = req.body;
    
    User.findOne({email:email},function(err,user){
        if(user){
            if(user.password === password){
                res.status(200).json({message:"Login Success",user:user});
            }else{
                res.status(200).json("Password Not matched");
            }
        }else{
            res.status(200).json("No such user found for email");
        }
    });
})

export default router;