import { check,validationResult } from "express-validator";
import errorResponse from "../utils/errorResponse";
class validator{
    static inputvalidator(req,res,next){
        const error=validationResult(req)
        if(!error==error.isEmpty()){
            error.error.map((err)=>{
                errorResponse(res,401,err.msg)
            })
        }else{
            return next()
        }
    }
    static userAccountRule(){
        return[
        check("firstName","Please write your firstName correctly").trim().isAlpha(),
        check("email","Please write your email correctly").trim().isEmail(),
        check("password","Provide strong password").trim().isStrongPassword()

        ]
    }
}
export default validator