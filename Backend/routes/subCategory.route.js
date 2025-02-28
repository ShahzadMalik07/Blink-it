import { Router } from "express";
import { AddSubCategoryController, getAllSubCategoryController } from "../controllers/subCategoryContoller.js";

const subCategoryRouter = Router()

subCategoryRouter.post("/create",AddSubCategoryController)
subCategoryRouter.get("/get-subcategory",getAllSubCategoryController)


export default subCategoryRouter