import User from "../model/User";
import bcrypt, { hash } from 'bcrypt';
import errorResponse from "../utils/errorResponse";
import successResponse from "../utils/successResponse";
import  Jwt  from "jsonwebtoken";



class UserController{
    static async createUser(req,res){
    const {firstName,lastName,email,password}=req.body
        

        try{
        if(req.body.password!==req.body.confirmPassword){
            return errorResponse(res,403,`password and confirm password is not matched`)
        }
           
           const hashPassword=bcrypt.hashSync(req.body.password,10)
           const user =await User.create({firstName,lastName,email,password:hashPassword});

           const status=201
            const msg=`user successfuly created`
            const data=user
            successResponse(res,status,msg,data)

        }catch(error){
         return errorResponse(res,403, `User already exist`)
             }
    }

    static async login(req,res){
      //take data from body
      const{email,password}=req.body
      //verify if email exist
      const user=await User.findOne({email})
      if(!user){
        return errorResponse(res,401,`Invalid email or password`)
      }else{
        //verify password
        const comparePassword=bcrypt.compareSync(password,user.password)
        if(!comparePassword){
          return errorResponse(res,401,`Invalid email or password`)

        }else{
          //generate a token
          const token=Jwt.sign({role:user.role,email:user.email,firstName:user.firstName},process.env.SECRET_KEY,{expiresIn:"1d"})
         return res.status(200).json({
          token:token,
          data:{
            email:user.email,
            firstName:user.firstName,
            password:user.password,
            role:user.role
          }
         })
        
        }
      }
    }
    static async getAllUsers(req,res){
        const users= await User.find();
        if(!users || users.length==0){
            return errorResponse(res,401,'no user found')
     
            
        }else if(users){
           const status=200
           const msg=`all ${users.length}Users Found`
           const data=users
           return successResponse(res,status,msg,data)
        }
    }
  static async deleteAllUsers(req,res){
    const users=await User.deleteMany()
    return successResponse(res,200,'all users delete',users)
    
  }
  static async getOneUser(req,res){
    const id=req.params.ido
    const user=await User.findById(id)
    if(!user){
      return errorResponse(res,401,`no user found with that id : ${id}`)


    }else{
        return successResponse(res,200,`user successfuly retrieved`,user)
    }
  }
  
  static async deleteOneUser(req,res){
    const id=req.params.id
    const user=await User.findByIdAndDelete(id)
    if(!user){
      errorResponse(res,401,`user with id ${id}not found`)
    }else{
      successResponse(res,200,`user successfuly deleted`,user)
    }
  }

  static async updateUser(req,res){
    const id=req.params.id
    const user=await User.findByIdAndUpdate(id,req.body,{new:true})
    if(!user){
      errorResponse(res,401,`user with id ${id}not found`)
    }else{
      successResponse(res,200,`user successfuly updated`,user)
    }
  }
}

export default UserController



