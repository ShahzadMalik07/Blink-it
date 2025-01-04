import UserModel from "../models/Usermodel.js";
import bcrypt from "bcryptjs"
import sendEmail from "../config/sendEmails.js"
import verifyEmailTemplate from "../utils/verifyTemplate.js";
import generateAccessToken from "../utils/AccessToken.js";
import generateRefreshToken from "../utils/RefreshToken.js";

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Provide email, name, password",
                error: true,
                succsess: false
            })

        }

        const user = await UserModel.findOne({ email })
        if (user) {
            return response.json({
                message: "Already register",
                error: true,
                succsess: false

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
            succsess: true,
            data: save
        })









    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            succsess: false
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
                succsess: false
            })


        }

        const updatedUser = await UserModel.updateOne({ _id: code }, {
            verify_email: true
        })

        return response.json({
            message: "Email verified",
            error: false,
            succsess: true
        })

    } catch (error) {
        return response.json({
            message: error.message || error,
            error: true,
            succsess: false
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
                succsess: false
            })

        }

        if (!user) {
            return response.status(500).json({
                message: "User doesn't found, please signup",
                error: true,
                succsess: false
            })

        }

        if (user.status !== "Active") {
            return response.json({
                message: "Please contact Admin",
                error: true,
                succsess: false
            })

        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return response.json({
                message: "Password is Incorrect",
                error: true,
                succsess: false
            })

        }

        const accsessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        console.log(accsessToken, refreshToken)


        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.cookie("accessToken", accsessToken, cookieOption)
        response.cookie("refreshToken", refreshToken, cookieOption)


        return response.json({
            message: "Login success",
            error: false,
            succsess: true,
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
        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.clearCookie("accessToken", cookieOption)
        response.clearCookie("refreshToken", cookieOption)

        return response.json({
            message: "Logout successfully",
            error: false,
            succsess: true
        })
        
    } catch (error) {
        return response.json({
            message: error.message || error,
            error: true,
            succsess: false
        })
    }

}