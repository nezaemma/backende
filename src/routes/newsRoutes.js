import  express  from "express";
import NewsController from "../controller/newsController";
import VerifyAccess from "../middlewares/verifyAccess";

const router=express.Router()
router.post('/',VerifyAccess("admin"), NewsController.createNews);
router.get("/",NewsController.getAllNews);
router.patch("/:id",VerifyAccess("admin"),NewsController.updateNews);
router.get("/:id",NewsController.getOneNews);
router.delete("/:id",VerifyAccess("admin"), NewsController.deleteOneNews);
router.put("/like/:id", NewsController.like);
router.put("/dislike/:id", NewsController.dislike);

export default router
