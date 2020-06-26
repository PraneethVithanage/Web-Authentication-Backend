import express from "express";
import connectDB from './config/db';
import "./model/user"
import cors from 'cors'
import Auth from "./routes/auth/auth.routes"


const app = express();
app.use(cors());
app.use(express.json({extends:true}));
const PORT = process.env.PORT || 3001;
connectDB();
app.use("/api/auth",Auth)
app.listen(PORT,() => {

    console.log(`start port on ${PORT}`);
});
