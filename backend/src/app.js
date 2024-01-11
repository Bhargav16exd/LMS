import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// Basic Setup for server 

app.use(urlencoded({extended:true}))
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))
app.use(cookieParser())
app.use(express.static("public"))
app.use(express.json({
    limit:"16kb"
}))

// Routes


// Api routes imports

import userRouter from "./routes/user.router.js"
import courseRouter from "./routes/course.router.js"

// APP Routing 

app.use("/api/v1/user/",userRouter);
app.use("/api/v1/course/",courseRouter);

app.use((err, req, res) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || [];
  
    res.status(statusCode).json({
      success: false,
      message,
      errors,
      data: null,
    });
  });

export default app;