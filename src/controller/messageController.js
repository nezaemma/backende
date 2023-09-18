import Message from "../model/Message";
import errorResponse from "../utils/errorResponse";
import successResponse from "../utils/successResponse";

class MessageController{
    static async createMessage(req,res){
        const {email,message}=req.body;
        const msg=await Message.create({email,message})
        if(!msg){
            return errorResponse(res,401,`message not sent`)
        }else{
            return successResponse(res,201,`message successfuly sent`,msg)
        }
    }
    static async getAllMessage(req,res){
        const msg=await Message.find()
        if(!msg || msg.length==0){
            return errorResponse(res,401,`no message found`)
        }else{
            return successResponse(res,200,`message ${msg.length} successfuly retrieved`,msg)
        }

    }
    static async deleteAllMessage(req,res){
        const msg=await Message.deleteMany()
        if(!msg){
            return errorResponse(res,401,`no message deleted`)
        }else{
            return successResponse(res,200,`message deleted`)
        }
    }

}
export default MessageController