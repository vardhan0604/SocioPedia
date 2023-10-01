import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { register } from "./controllers/Auth.js";
import { createPost } from "./controllers/Post.js";

import  authRoutes from "./routes/Auth.js"
import  userRoutes from "./routes/User.js"
import  postRoutes from "./routes/Post.js"

import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import {users,posts} from "./data/index.js"

// CONFIGURATIONS

//allows us to access file url when we use module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const app= express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb",extended: true}))
app.use(express.urlencoded({limit: "30mb",extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,'public/assets')))


//FILE STORAGE

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage })

//ROUTES WITH FILES
app.post("/auth/register", upload.single("Picture"), register);
app.post("/post/create",verifyToken, upload.single("picture"), createPost);

//routes
app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/post",postRoutes);

//MONGOOSE SETUP
const PORT=process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, ()=> console.log(`SERVER PORT ${PORT}`))
    
    //ADD data only once
    // User.insertMany(users)
    // Post.insertMany(posts)

}).catch((err=>{
    console.log(err)
}))