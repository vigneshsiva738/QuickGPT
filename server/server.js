import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

await connectDB()

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Server is Live Now")
});
 
app.use("/api/user", userRouter);

app.listen(PORT, ()=>{
    console.log(`Server is Runnig on Port ${PORT}`)
}); 
