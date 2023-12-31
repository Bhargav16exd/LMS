import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// Basic Setup for server 

app.use(urlencoded({extended:true}))
app.use(cors({
    origin:process.env.ORIGIN
}))
app.use(cookieParser())
app.use(express.static("public"))
app.use(express.json({
    limit:"16kb"
}))

// Routes
app.all('/',(req,res)=>{
     res.json({
        message:"HOMEPAGE"
     })
})


export default app;