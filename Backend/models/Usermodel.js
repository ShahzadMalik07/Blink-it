import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please give your name"]

    },
    email:{
        type:String,
        required:[true,"please give your email"]
    },
    password:{
        type:String,
        required:[true,"Please give your password"]
    },
    avatar:{
        type:String,
        default:""
    },
    mobile:{
        type: Number,
        default: null
    },
    refresh_token:{
        type:String,
        default:""
    },
    verify_email:{
        type:Boolean,
        default:false
    },
    last_login_date:{
        type: Date,
        default:""
    },
    status:{
        type:String,
        enum: ["Active","Inactive","Suspended"],
        default:"Active"
    },
    address_details:[
        {
            type:mongoose.Schema.ObjectId,
            ref: "address"
        }
    ],
    shopping_cart:[
        {
            type:mongoose.Schema.ObjectId,
            ref: "cartProduct"
        }
    ],
    orderHistory:[
        {
            type:mongoose.Schema.ObjectId,
            ref: "order"
        }
    ],
    forgot_password_otp:{
        type:String
    },
    forgot_password_expiry:{
        type:Date,
    },
    role:{
        type:String,
        enum: ["USER","ADMIN"],
        default:"USER"
    }
    
},{timestamps:true})

const UserModel = mongoose.model("User",UserSchema)

export default UserModel 