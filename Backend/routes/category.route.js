import {Router} from "express"
import auth from "../middleware/authMiddleware.js"
import { AddCategoryController, getCategoryController, updateCategoryController } from "../controllers/categoryController.js"

const categoryRouter = Router()

categoryRouter.post("/add-category",auth,AddCategoryController)
categoryRouter.get("/get-category",getCategoryController)
categoryRouter.post("/update",updateCategoryController)

export default categoryRouter