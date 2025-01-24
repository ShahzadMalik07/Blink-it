import jwt from "jsonwebtoken"

const auth =  (request, response, next) => {
    try {
        const token = request.cookies.accessToken || request?.header?.authorization.split(" ")[1]
        
        if (!token) {
            return response.json({
                message:"provide token"
            })
            
        }

        const decoded = jwt.verify(token,process.env.ACCESS_JWT_SECRET || "iknowthisissecret")
   
        if (!decoded) {
            return response.json({
                message:"Unauthorized access",
                error:true,
                success:false
            })
            
        }

        request.userId = decoded.id
        next()


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}
export default auth