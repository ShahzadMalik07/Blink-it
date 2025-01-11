import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import dbConnect from "./config/Dbconnect.js"
import userRouter from "./routes/user.route.js"
dotenv.config()


const app = express()

app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false

}))


app.get("/",(request,response)=>{
    response.json({
        msg:"server is running"
    })
})

app.use("/api/user",userRouter)

dbConnect()

const PORT = 3000 || process.env.PORT

app.listen(PORT,()=>{
    console.log("port is running",PORT)
})