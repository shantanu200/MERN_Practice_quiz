import express from "express";
import QuizData from "../models/QuizData.js";

const router = express.Router();

router.post("/saveScore", function (req, res) {
    if (!req.body) res.status(500).json("Data not found....");

    const { username, score, totalque, binaryAnswers, timeTaken, queIndex } = req.body;

    const quizdata = new QuizData({
        username, score, totalque, binaryAnswers, timeTaken, queIndex
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

});

router.get("/userData/:username", function (req, res) {
    let username = req.params.username;

    QuizData.find({ username: username }, function (err, userdata) {
        if (userdata) {
            res.status(200).json(userdata);
        } else {
            res.status(500).json(err);
        }
    })
});

//MARK QUESTION 
router.post("/markquestion", function (req, res) {
    if (!req.body) res.status(500).json("Data not found....");

    const { username, qid } = req.body;

    QuizData.findOne({ username: username }, (err, qdata) => {
        if (qdata.markedquestions.includes(qid)) {
            let index = qdata.markedquestions.indexOf(qid);
            qdata.markedquestions.splice(index, 1);
            qdata.save().then(() => {
                res.status(200).json("Umarked Question");
            }).catch((error) => {
                res.status(500).json(error);
            })
        } else {
            qdata.markedquestions.push(qid);
            qdata.save().then(() => {
                res.status(200).json("Marked Question");
            }).catch((error) => {
                res.status(500).json(error);
            })
        }
    })
})

export default router;

