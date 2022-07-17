import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const URI = process.env.URI;

export default function connect_mongo(){
    mongoose.connect(URI,{
        useUnifiedTopology: true,
        useNewUrlParser:true
    }).then(() => {
        console.log("Connected to DB.....");
    }).catch((err) => {
        console.log("Error is "+err);
    })
};