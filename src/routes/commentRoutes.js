import express from 'express';
import CommentController from '../controller/commentController';
import VerifyAccess from '../middlewares/verifyAccess';


const router=express.Router()
router.post("/:id", VerifyAccess("user"), CommentController.postComment);
router.get("/",CommentController.getAllcomment);
router.delete("/:id", CommentController.deleteOnecomment);


export default router