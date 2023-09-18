import News from "../model/News"
import errorResponse from "../utils/errorResponse";
import successResponse from "../utils/successResponse";
import sendEmail from "../utils/email";
import User from "../model/User"

class NewsController{
    //create a news
    static async createNews(req,res){
        const news=await News.create(req.body);
        try{
        if(!news){
            return errorResponse(res,401,`News not created`);

        }else{
            const users = await User.find();
            users.map((user) => {
            sendEmail(user,news);
            });
            return successResponse(res,201,`News successfuly posted`,news);
    
        }
    } catch(error) {
        return errorResponse(res,404,error);
    }
}
    //find all news
    static async getAllNews(req,res){
    const news=await News.find();
    try {
        if(!news) {
            return errorResponse(res,401,`No news Found`)

        
        } else{
            return successResponse(res,200,`News ${news.length} found`,news);

        }
    }catch(error){
        return errorResponse(res,401,error)
    }
    }

    //update a news
    static async updateNews(req,res){
        const{id}=req.params;
        const news=await News.findByIdAndUpdate({_id:id},req.body,{
            new:true,
        });
        try{
            if(!news){
                return errorResponse(res,401, `news not update`);

            }else{
                return successResponse(res,200,`News successfuly update`,news);

            }
        } catch{
            return errorResponse(res,404,error)

        }
      }
      //get one news

      static async getOneNews(req,res){
        const{id}=req.params;
        const news=await News.findOne({_id:id});
        try{
            if(!news){
                return errorResponse(res,401,`news with id ${id}not found`);

            }else{
          return successResponse(res,200,`news successfuly retrieved with ${news.Comment.length}comments`,news);

            }
        } catch (error){
            return errorResponse(res,404,error);
        }
      }
      static async like(req,res) {
        const newsId=req.params.id;
        const news= await News.findById({_id:newsId});
        if(!news) {
            return errorResponse(res,401,`News not found`);
        }else{
        news.likes += 1;
        await news.save();
        return successResponse(res,200,`you liked ${news.likes}`,news);

        }
      }

      static async dislike(req,res){
        const newsId=req.params.id;
        const news =await News.findById({_id: newsId});
        if(!news) {
        return errorResponse(res,401,`News not found`);

        }else{
        news.dislikes +=1;
        await news.save();
        return successResponse(res,200,`you dislikes ${news.dislikes}`,news);

        }
      }
      

      static async deleteOneNews(req,res){
        const id=req.params.id
        const news=await News.findByIdAndDelete({_id:id})
        if(!news){
            return errorResponse(res,401,`news with id ${id} not found`)

        }else{
            return successResponse(res,200,`news successfuly deleted`,news)
        }
      }
}
export default NewsController;