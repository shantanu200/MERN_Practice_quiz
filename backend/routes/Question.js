import express from "express";
import Question from "../models/Question.js";
const router = express.Router();

router.post("/addque",function(req,res){
    if(!req.body) res.sendStatus(500);

    const {que,option1,option2,option3,option4,ans} = req.body;

    const fQue = {
        question: que,
        options:[
            {text:option1,id:1},
            {text:option2,id:2},
            {text:option3,id:3},
            {text:option4,id:4},
        ],
        answer:ans
    }

    try{
       const dbQue = new Question(fQue);
       
       dbQue.save().then(() => {
        console.log("Question is added");
        res.status(200).json("Question is sucessfully added");
       }).catch((err) => {
        res.status(500).json(err);
       })
    }catch(err) {console.log(err)}
});

router.get("/fetchall",function(req,res){
    Question.find({},(err,questionBank)=>{
        if(questionBank){
            res.status(200).json(questionBank);
        }else{
            res.status(500).json(err);
        }
    })
});

router.get("/delete/:id",function(req,res){
    let id = req.params.id;

    Question.findByIdAndRemove({
        _id:id
    },function(err,user){
        if(err) res.status(500).json(err);

        else res.status(200).json("User is deleted Successfully");
    });
});

router.get("/updateUser/:id",function(req,res){
    let id = req.params.id;

    Question.findById(id,function(err,question){
        if(!question) res.status(500).json("Question is not found");

        res.status(200).json(question);
    })
})




export default router;