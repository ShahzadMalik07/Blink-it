import imageUplaodCloud from "../utils/imageUplaodCloud.js"

 export const uploadImageController = async (request,response)=>{
    try {
        const file = request.file

        const imgaeUpload = await imageUplaodCloud(file)
     
        return response.json({
            message:"Upload Successfully",
            error:false,
            success:true,
            data:imgaeUpload
        })
        
    } catch (error) {
        return response.json({
            message: error.message || error,
            success:false,
            error:true
        })
    }
}