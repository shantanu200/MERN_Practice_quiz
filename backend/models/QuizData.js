import mongoose from "mongoose";

const QuizDataSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true
   },
   score: {
      type: Number,
      required: true,
   },
   totalque: {
      type: Number,
      required: true
   },
   binaryAnswers: {
      type: [Number],
      required: true
   },
   timeTaken: {
      type: [Number],
      required: true
   },
   queIndex: {
      type: [Number],
      required: true
   }
}, { timestamps: true })


export default mongoose.model("QuizData", QuizDataSchema);