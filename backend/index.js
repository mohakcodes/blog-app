const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const multer = require("multer");

const path = require("path");

//routers
const authRouter = require('../backend/routes/auth.js')
const userRouter = require('../backend/routes/users.js')
const postRouter = require('../backend/routes/posts.js')
const commentRouter = require('../backend/routes/comments.js')

//middlewares
dotenv.config();
app.use(express.json());
app.use(cors({origin: 'http://127.0.0.1:5173', credentials: true}));
app.use("/api/auth" , authRouter);
app.use("/api/user" , userRouter);
app.use("/api/post" , postRouter);
app.use("/api/comment" , commentRouter);
app.use(cookieParser());
app.use("/images",express.static(path.join(__dirname, "/images")));

//image upload - storage
const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images");
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img);
    }
})

//image upload - middleware
const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("Image Has Been Uploaded");
})

//database
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is Connected Successfully!")
    } catch (err) {
        console.log(err);
    }
}

app.listen(process.env.PORT,()=>{
    connectDB();
    console.log(`App Running Successfully on Port : ${process.env.PORT}!`);
})