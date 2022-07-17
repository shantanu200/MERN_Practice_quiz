import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect_mongo from "./db.js";
import queRoutes from "./routes/Question.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/",queRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    connect_mongo();
    console.log(`Server is running on PORT ${PORT} `);
});

