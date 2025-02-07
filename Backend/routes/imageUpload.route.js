import  {Router} from "express"
import auth from "../middleware/authMiddleware.js"
import { uploadImageController } from "../controllers/uploadImageContoller.js"
import upload from "../middleware/multer.js"

const imageUploadRouter = Router()

imageUploadRouter.post("/upload",auth,upload.single("image"),uploadImageController)

export default imageUploadRouter