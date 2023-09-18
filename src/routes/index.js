import express from "express";
import userRouter from './userRoutes'
import messageRoutes from './messageRoutes'
import newsRoutes from './newsRoutes'
import commentRoutes  from './commentRoutes'

const router= express.Router();
router.use("/user",userRouter)
router.use("/message",messageRoutes)
router.use("/news",newsRoutes)
router.use("/comment",commentRoutes)
export default router

