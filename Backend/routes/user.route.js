import { Router } from "express"
import { forgotPassword, loginController, logoutController, refreshToken, registerUserController, resetPassword, updateUserDetails, uploadImage, userDetails, verifyEmailController, verifyForgotPasswordOtp } from "../controllers/userController.js"
import auth from "../middleware/authMiddleware.js"
import upload from "../middleware/multer.js"

const userRouter = Router()


userRouter.post("/register",registerUserController)
userRouter.post("/verify-email",verifyEmailController)
userRouter.post("/login",loginController)
userRouter.get("/logout",auth,logoutController)
userRouter.put("/upload-image",auth,upload.single("image"),uploadImage)
userRouter.put("/update-user",auth,updateUserDetails)
userRouter.put("/forgot-password",forgotPassword)
userRouter.put("/verify-forgot-password",verifyForgotPasswordOtp)
userRouter.put("/reset-password",resetPassword)
userRouter.post("/refresh-token",refreshToken)
userRouter.get("/user-details",auth,userDetails)
export default userRouter