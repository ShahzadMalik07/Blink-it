import jwt from "jsonwebtoken";
import UserModel from "../models/Usermodel.js";

const generateRefreshToken = async (userId) => {
    try {
        const token = jwt.sign({ id: userId }, process.env.REFRESH_JWT_SECRET, { expiresIn: "7d" });
        await UserModel.updateOne({ _id: userId }, { refresh_token: token });

        return token;
    } catch (error) {
        console.error("Error generating refresh token:", error);
        throw new Error("Could not generate refresh token");
    }
};

export default generateRefreshToken;
