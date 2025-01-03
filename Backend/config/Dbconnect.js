import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

async function dbConnect(){
    try {

        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Db Connected successfully")
        
    } catch (error) {
        console.log("Mongodb connection error",error)
        process.exit(1)

        
    }

}

export default dbConnect