import categoryModel from "../models/CategoryModel.js";
import productModel from "../models/productModel.js";
import subCategoryModel from "../models/SubCategoryModel.js";

export const AddCategoryController = async (request, response) => {
    try {
        const { name, Image } = request.body
        if (!name || !Image) {
            return response.json({
                message: "Enter required fields",
                error: true,
                success: false
            })

        }
        const addCategory = categoryModel({
            name,
            Image
        })
        const save = await addCategory.save()
        if (!save) {
            return response.json({
                message: "category not created",
                success: false,
                error: true
            })

        }
        return response.json({
            message: "Add Category",
            success: true,
            error: false,
            data: save
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getCategoryController = async (request, response) => {
    try {
        const data = await categoryModel.find().sort({createdAt:-1})
        return response.json({
            message: "Get data",
            success: true,
            error: false,
            data: data
        })

    } catch (error) {
        return response.json({
            message: error.message || error,
            success: false,
            error: true
        })

    }
}

export const updateCategoryController = async (request, response) => {
    try {
        const { _id, name, Image } = request.body
        const update = await categoryModel.updateOne({
            _id: _id
        }, {
            name,
            Image
        })

        return response.json({
            message: "Updates Succesfully",
            error: false,
            success: true,
            data: update
        })

    } catch (error) {
        return response.json({
            message: error.message || error,
            success: false,
            error: true
        })

    }
}

export const deleteCategoryController = async (request, response) => {
    try {
        const {_id } = request.body
        const subCategory = await subCategoryModel.find({
            category:{
                "$in":[_id]
            }
        }).countDocuments()
        
        const product = await productModel.find({
            category:{
                "$in":[_id]
            }
        }).countDocuments()

        if (subCategory>0 || product>0) {
            return response.json({
                message:"Can't delete Category already use",
                error:true,
                success:false
            })
            
        }

        const deleteCategory = await categoryModel.deleteOne({_id:_id})
        return response.json({
            message:"Category Deleted Successfully",
            success:true,
            error:false,
            data:deleteCategory
        })


    } catch (error) {
        return response.json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}