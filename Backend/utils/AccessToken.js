import jwt from "jsonwebtoken"

const generateAccessToken = async (userId) => {
    const token = await jwt.sign({ id: userId }, process.env.ACCESS_JWT_SECRET, { expiresIn: "4h" })

    return token


}

export default generateAccessToken