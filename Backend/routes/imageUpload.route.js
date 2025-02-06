import  {Router} from "express"
import auth from "../middleware/authMiddleware.js"
import { uploadImageController } from "../controllers/uploadImageContoller.js"

const imageUploadRouter = Router()

imageUploadRouter.post("/upload",auth,uploadImageController)

export default imageUploadRouter