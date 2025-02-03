import categoryModel from "../models/CategoryModel.js";

export const AddCategoryController= async(request,response)=>{
    try {
        const { name, image } = request.body
        if (!name || !image) {
            return response.json({
                message:"Enter required fields",
                error:true,
                success:false
            })
            
        }
        const addCategory = categoryModel({
            name,
            image
        })
        const save = await addCategory.save()
        if (!save) {
            return response.json({
                message:"category not created",
                success:false,
                error:true
            })
            
        }
        return response.json({
            message:"Add Category",
            success:true,
            error:false,
            data:save
        })
        
    } catch (error) {
        return response.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
} 