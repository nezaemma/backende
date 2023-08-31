import express from 'express';
import userController from '../controller/userController';

const router=express.Router()
router.post("/",userController.createUser)
router.get("/",userController.getAllUsers)
router.delete('/',userController.deleteAllUsers)
router.get('/:ido',userController.getOneUser)
router.delete("/:id",userController.deleteOneUser)
router.patch("/:id",userController.updateUser) 
router.post("/login",userController.login)


export default router
