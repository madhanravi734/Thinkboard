import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dns from "dns";
import dotenv from "dotenv";
import rateLimiter from "./middleware/ratelimiter.js";
import cors from 'cors'
import path from "path"
dotenv.config();
dns.setServers(["1.1.1.1"]);

const app=express();
const PORT=process.env.PORT || 5001
const __dirname=path.resolve()
app.use(express.json())
app.use(cors());
app.use(rateLimiter)
app.use("/api/notes",notesRoutes)
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../Frontend/project/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../Frontend","project","dist","index.html"))
})
}
connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log("Server started on PORT:",PORT);
});
});
