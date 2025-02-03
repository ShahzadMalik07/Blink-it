import {Router} from "express"
import auth from "../middleware/authMiddleware.js"
import { AddCategoryController } from "../controllers/categoryController.js"

const categoryRouter = Router()

categoryRouter.post("/add-category",auth,AddCategoryController)

export default categoryRouter