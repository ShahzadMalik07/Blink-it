import subCategoryModel from "../models/SubCategoryModel.js"

export const AddSubCategoryController = async (request, response) => {
    try {
        const { name, image, category } = request.body
        if (!name || !image || !category[0]) {
            return response.json({
                message: "Please provide all fields",
                error: true,
                success: false
            })

        }
        const subCategorydata = {
            name,
            image,
            category
        }

        const subCategory = new subCategoryModel(subCategorydata)
        const save = await subCategory.save()

        return response.json({
            message:"sub Category Added",
            error:false,
            success:true,
            data:save
        })

    } catch (error) {
        return response.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getAllSubCategoryController = async (request,response)=>{
    try {
        const subCategoryData = await subCategoryModel.find()
        if (!subCategoryData) {
            return response.json({
                message:"Error Fetching Data",
                success:false,
                error:true
            })
            
        }
        return response.json({
            message:"Data Fetched Successfully",
            success:true,
            error:false,
            data:subCategoryData
        })

        


    } catch (error) {
        return response.json({
            message:error.message || error,
            success:false,
            error:true
        })
    }

}