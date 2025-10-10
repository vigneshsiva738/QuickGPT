import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is Live Now")
});

app.listen(PORT, ()=>{
    console.log(`Server is Runnig on Port ${PORT}`)
});
