import express from 'express';
import CommentController from '../controller/commentController';
import VerifyAccess from '../middlewares/verifyAccess';
import commentController from '../controller/commentController';

const router=express.Router()
router.post("/:id", VerifyAccess("user"), commentController.postComment);
router.get("/",CommentController.getAllcomment);
router.delete("/:id", commentController.deleteOnecomment);


export default router