import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    Image:{
        type:String,
        default:""
    },
},{timestamps:true})

const categoryModel = mongoose.model("Category",categorySchema)

export default categoryModel