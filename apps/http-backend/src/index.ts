import dotenv from "dotenv";
import path from "path";
dotenv.config({path:path.resolve(process.cwd(),"../.env")})
import express from "express";
import signuprouter from "./routes/auth"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({origin:"*",}));  
app.use("/api",signuprouter)

const port =process.env.PORT || 3001;

app.listen(port, () =>{
  console.log(`HTTP server running on ${port}`);
})