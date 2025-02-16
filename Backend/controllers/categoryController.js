import categoryModel from "../models/CategoryModel.js";

export const AddCategoryController= async(request,response)=>{
    try {
        const { name, Image } = request.body
        if (!name || !Image) {
            return response.json({
                message:"Enter required fields",
                error:true,
                success:false
            })
            
        }
        const addCategory = categoryModel({
            name,
            Image
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

export const getCategoryController = async (request,response)=>{
    try {
        const data = await categoryModel.find()
        return response.json({
            message:"Get data",
            success:true,
            error:false,
            data:data
        })
        
    } catch (error) {
        return response.json({
            message:error.message || error,
            success:false,
            error:true
        })
        
    }
}

export const updateCategoryController = async (request,response)=>{
    try {
        const {categoryId, name, Image} = request.body

        const update = await categoryModel.updateOne({
            _id:categoryId
        },{
            name,
            Image
        })
        return response.json({
            message:"Updates Succesfully",
            error:false,
            success:true,
            data:update
        })
        
    } catch (error) {
        return response.json({
            message:error.message || error,
            success:false,
            error:true
        })
        
    }
}