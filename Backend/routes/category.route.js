import {Router} from "express"
import auth from "../middleware/authMiddleware.js"
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/categoryController.js"

const categoryRouter = Router()

categoryRouter.post("/add-category",auth,AddCategoryController)
categoryRouter.get("/get-category",getCategoryController)
categoryRouter.put("/update",updateCategoryController)
categoryRouter.delete("/delete",deleteCategoryController)

export default categoryRouter