import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    options:{
        type:[Object],
        required:true
    },
    answer:{
        type:Number,
        required:true
    },
    solution:{
        type:String
    }
},{timestamps:true});

export default mongoose.model("Question",QuestionSchema);