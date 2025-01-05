import jwt from "jsonwebtoken"

const generateAccessToken =  (userId) => {
    const token = jwt.sign({ id: userId }, process.env.ACCESS_JWT_SECRET, { expiresIn: "4h" })

    return token


}

export default generateAccessToken