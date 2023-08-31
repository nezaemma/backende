import mongoose from "mongoose";

const userSchemas=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
       
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },

    createdAt:{
        type:Date,
        default:Date.now()
    }
   
});
const User=mongoose.model("User", userSchemas)
export default User