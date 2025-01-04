import jwt from "jsonwebtoken"
import UserModel from "../models/Usermodel.js"

const generateRefreshToken = async (userId) => {
    const token = await jwt.sign({ id: userId }, process.env.REFRESH_JWT_SECRET, { expiresIn: "7d" })

    const updatedRefreshToken = await UserModel.updateOne({ _id: userId }, {
        refresh_token: token
    })

}

export default generateRefreshToken