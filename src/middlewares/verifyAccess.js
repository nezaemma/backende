import jwt from "jsonwebtoken"
import errorResponse from "../utils/errorResponse"

const VerifyAccess=(passRole) =>{
    return(req,res,next)=>{
         //setting our token in headers
    const token=req.headers["auth-token"];
      //if no token
      if(!token){
       return errorResponse(res,401,`No Token Provided`)
      }else{
       try {
           const verifyToken=jwt.verify(token,process.env.SECRET_KEY,{expiresIn:"1d",});
           req.user=verifyToken.user;
           
           if(passRole !== verifyToken.user.role) {
            return errorResponse(res,401, `You don't have access`);

           }else{
            return next();
           }
               
           
       } catch (error) {
          if(error.name=="JsonWebTokenError"){
           return errorResponse(res,401,`Invalid Token or Expired Token`)
          }
    }
    
    
    }

  

   };

};

export default VerifyAccess