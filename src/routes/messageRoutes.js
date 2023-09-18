import express from 'express'
import MessageController from '../controller/messageController'
import DataChequer from '../middlewares/dataChequer'
import VerifyAccess from '../middlewares/verifyAccess'


const router=express.Router()

router.post("/",DataChequer.userRegisterIsEmpty,MessageController.createMessage);
router.get("/",VerifyAccess,MessageController.getAllMessage);
router.delete("/",VerifyAccess,MessageController.deleteAllMessage);


export default router