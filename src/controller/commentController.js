

import Comment from "../model/comment";
import News from "../model/News";
import errorResponse from "../utils/errorResponse"
import successResponse from "../utils/successResponse"
class commentController{
    static async postComment(req,res){
        const newsIdParams=req.params.id;
        req.body.user=req.user._id;
        console.log("umu user wateye comment ni ...", req.user);
    
    const comment=await Comment.create(req.body)
    const news=await News.findByIdAndUpdate({_id:newsIdParams},
        {
            $push:{
        comment:comment

    },
},
{new:true})
    if(!news){
        return errorResponse(res,401,`no news found`)

    }else{
        return successResponse(res,200,`comment successfuly created`,news)
    }

    }
    static async getAllcomment(req,res){
      const comment=await Comment.find();
        return successResponse(res,200,`success ${comment.length}`,comments);
    }
    static async deleteOnecomment(req,res) {
    const id=req.params.id;
    const deleteComment=await Comment.findByIdDelete({_id:id});
    if(!deleteComment) {
        return errorResponse(res,401,"comment not found");

    }else{
        return successResponse(res,200,`comment successfuly deleted`);
        
    }
    }
}

export default commentController