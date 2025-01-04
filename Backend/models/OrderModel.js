import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    orderId:{
        type: String,
        required:[true,"provide orderId"],
        unique:true
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref: "Product"
    },
    product_details:{
        name:String,
        Image:Array
    },
    paymentId:{
        type:String,
        default:""
    },
    payment_status:{
        type:String,
        default:""
    },
    delivery_address:{
        type: mongoose.Schema.ObjectId,
        ref:"Address"
    },
    subTotal:{
        type:Number,
        default:0
    } ,
    totalAmt:{
        type:Number,
        default:0

    },
    invoice_receipt:{
        type:String,
        default:""
    }

},{timestamps:true})

const OrderModel = mongoose.model("order",orderSchema)
export default OrderModel