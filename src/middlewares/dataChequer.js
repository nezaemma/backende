import express from 'express'
import successResponse from '../utils/successResponse'
import User from '../model/User'
import errorResponse from '../utils/errorResponse'
class DataChequer{
    static userRegisterIsEmpty=(req,res,next)=>{
   const{firstName,lastName,email,password}=req.body
   if(firstName==""){
    return errorResponse(res,401,`Provide your firstname`)
   } else if(lastName==""){
    return errorResponse(res,401,`Provide your lastname `)

   } else if(email==""){
    return errorResponse(`res,401,Provide your email`)
   } else if (password==""){
    return errorResponse(res,401,`Provide your password`)

   }else{
    return next()
   }  
    }
    static async emailExist(req,res,next){
        const email=req.body.email;
        const user=await User.findOne({email})
        if(user){
            return errorResponse(res,401,`email already exist`)

        }else{
            return next()
        }
    }
}
export default DataChequer