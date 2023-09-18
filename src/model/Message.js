import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please enter your email'],
      
    },
    message:{
        type:String,
        required:[true,'please enter your email']  
    },
    sendAt:{
        type:Date,
        default:Date.now()
    }
})

const Message=mongoose.model("Message",MessageSchema)
export default Message