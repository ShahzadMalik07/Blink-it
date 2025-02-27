import { Router } from "express";
import { AddSubCategoryController } from "../controllers/subCategoryContoller.js";

const subCategoryRouter = Router()

subCategoryRouter.post("/create",AddSubCategoryController)

export default subCategoryRouter