 export const uploadImageController = (request,response)=>{
    try {
        const file = request.file
        
    } catch (error) {
        return response.json({
            message: error.message || error,
            success:false,
            error:true
        })
    }
}