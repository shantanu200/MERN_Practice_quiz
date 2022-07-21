import express from "express";
import QuizData from "../models/QuizData.js";

const router = express.Router();

router.post("/saveScore",function(req,res){
    if(!req.body) res.status(500).json("Data not found....");

    const {username,score,totalque,binaryAnswers,timeTaken,queIndex} = req.body;

    const quizdata = new QuizData({
        username,score,totalque,binaryAnswers,timeTaken,queIndex
    });

    try {
        quizdata.save()
        .then(() => {
            res.status(200).json("Score is added to database");
        }).catch((err) => {
            res.status(500).json(err);
        })
    } catch (err) {
       res.status(500).json(err);
    }

})

export default router;

