import UserModel from "../models/Usermodel.js";
import bcrypt from "bcryptjs"
import sendEmail from "../config/sendEmails.js"
import verifyEmailTemplate from "../utils/verifyTemplate.js";
import generateAccessToken from "../utils/AccessToken.js";
import generateRefreshToken from "../utils/RefreshToken.js";
import imageUplaodCloud from "../utils/imageUplaodCloud.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken"

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Provide email, name, password",
                error: true,
                success: false
            })

        }

        const user = await UserModel.findOne({ email })
        if (user) {
            return response.json({
                message: "User already register",
                error: true,
                success: false

            })

        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new UserModel(userData)
        const save = await newUser.save()


        const emailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verificationEmail = await sendEmail({
            sendTo: email,
            subject: "verification email from blink-it",
            html: verifyEmailTemplate({
                name,
                url: emailUrl
            })
        })

        return response.json({
            message: "User register successfully",
            error: false,
            success: true,
            data: save
        })









    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }

}

export async function verifyEmailController(request, response) {
    try {
        const { code } = request.body
        const user = UserModel.findOne({ _id: code })

        if (!user) {
            return response.status(400).json({
                message: "invalid code",
                error: true,
                success: false
            })


        }

        const updatedUser = await UserModel.updateOne({ _id: code }, {
            verify_email: true
        })

        return response.json({
            message: "Email verified",
            error: false,
            success: true
        })

    } catch (error) {
        return response.json({
            message: error.message || error,
            error: true,
            success: false
        })

    }

}


export async function loginController(request, response) {
    try {

        const { email, password } = request.body
        const user = await UserModel.findOne({ email })

        if (!email || !password) {
            return response.json({
                message: "Please give Email and Password",
                error: true,
                success: false
            })

        }

        if (!user) {
            return response.status(500).json({
                message: "User doesn't found, please signup",
                error: true,
                success: false
            })

        }

        if (user.status !== "Active") {
            return response.json({
                message: "Please contact Admin",
                error: true,
                success: false
            })

        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return response.json({
                message: "Password is Incorrect",
                error: true,
                success: false
            })

        }

        const accsessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)




        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.cookie("accessToken", accsessToken, cookieOption)
        response.cookie("refreshToken", refreshToken, cookieOption)


        return response.json({
            message: "Login success",
            error: false,
            success: true,
            data: {
                accsessToken,
                refreshToken
            }
        })


    } catch (error) {
        console.log(error)
    }

}

export async function logoutController(request, response) {
    try {

        const userId = request.userId
        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.clearCookie("accessToken", cookieOption)
        response.clearCookie("refreshToken", cookieOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, { refresh_token: "" })

        return response.json({
            message: "Logout successfully",
            error: false,
            success: true
        })

    } catch (error) {
        return response.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

export async function uploadImage(request, response) {

    try {

        const userId = request.userId
        const image = request.file
        const upload = await imageUplaodCloud(image)


        const userUpdated = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })
        return response.json({
            message: "upload profle successfully",
            data: {
                _id: userId,
                avatar: upload.url
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }

}

export async function updateUserDetails(request, response) {
    try {

        const userId = request.userId

        const { name, email, password, mobile } = request.body
        let hashedPassword = ""

        if (password) {
            const salt = await bcrypt.genSalt(10)
            hashedPassword = await bcrypt.hash(password, salt)

        }


        const updatedUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashedPassword }),

        })

        return response.json({
            message: "User updated successfully",
            error: false,
            success: true,
            data: updatedUser

        })


    } catch (error) {
        return response.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


export async function forgotPassword(request, response) {
    try {
        const { email } = request.body
        const checkUserEmail = await UserModel.findOne({ email })
        if (!checkUserEmail) {
            return response.json({
                message: "Sorry email is not availabe",
                error: true,
                success: false
            })

        }

        const otp = generateOtp()
        const expiry = new Date() + 60 * 60 * 1000

        const update = await UserModel.findByIdAndUpdate(checkUserEmail._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expiry).toISOString()

        })


        await sendEmail({
            sendTo: email,
            subject: "Forgot password from Blink-it",
            html: forgotPasswordTemplate({ name: checkUserEmail.name, otp: otp })
        })


        return response.json({
            message: "check your email",
            error: false,
            success: true
        })





    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyForgotPasswordOtp(request, response) {
    try {

        const { email, otp } = request.body

        if (!email || !otp) {
            return response.json({
                message: "please provide required fields email, otp",
                error: true,
                success: false
            })

        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return response.json({
                message: "Sorry email is not availabe",
                error: true,
                success: false
            })

        }

        const currentTime = new Date().toISOString()

        if (user.forgot_password_expiry < currentTime) {
            return response.status(400).json({
                message: "Otp Expired",
                error: true,
                success: false
            })
        }

        if (otp !== user.forgot_password_otp) {
            return response.json({
                message: "Invalid Otp",
                error: true,
                success: false
            })

        }

        return response.json({
            message: "Otp Verified",
            error: false,
            success: true

        })



    } catch (error) {
        return response.json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

export async function resetPassword(request, response) {
    try {

        const { email, newPassword, confirmPassword } = request.body

        if (!email || !newPassword || !confirmPassword) {
            return response.json({
                message: "Please Provide required fields email, newPassword, confirmPassword"
            })

        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return response.json({
                message: "Email not exists",
                error: true,
                success: false
            })

        }

        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "passwords not matching",
                error: true,
                success: false
            })

        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        const update = await UserModel.findOneAndUpdate(user._id, {
            password: hashedPassword
        })

        return response.json({
            message: "Password updated Successfully",
            error: false,
            success: true
        })

    } catch (error) {
        return response.json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

export async function refreshToken(request, response) {
    try {

        const token = request.cookies.refreshToken || request?.header?.authorization?.split(" ")[1]

        if (!token) {
            return response.json({
                message: "Invalid Token",
                error: true,
                success: false
            })

        }
        const verifyToken = await jwt.verify(token, process.env.REFRESH_JWT_SECRET)
        if (!verifyToken) {
            return response.json({
                message: "token is expired",
                error: true,
                success: false
            })

        }

        const userId = verifyToken?._id
        const newAccessToken = await generateAccessToken(userId)

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.cookie("accessToken", newAccessToken, cookieOption)

        return response.json({
            message:"New access-token generated",
            error:false,
            success:true,
            data:{
                accessToken:newAccessToken
            }
        })


    } catch (error) {
        return response.json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}