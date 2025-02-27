import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import uploadImage from '../utils/UploadImage'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError.js';
import axios from 'axios';
import toast from 'react-hot-toast';


const UploadSubCategory = ({ close }) => {
  const [subcategoryData, setsubcategoryData] = useState({
    name: "",
    image: "",
    category: []
  })


  const allCategoryData = useSelector(store => store.product.allCategory)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/api/sub-category/create", subcategoryData)
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        close()
        
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setsubcategoryData((prev) => {
      return {
        ...prev,
        [name]: value

      }
    })
  }
  const handleUploadImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return

    }

    const response = await uploadImage(file)
    const { data: imageResponse } = response

    setsubcategoryData((prev) => {
      return {
        ...prev,
        image: imageResponse.data.url
      }
    })

  }
  const handleDeleteSelected = (categogryId) => {
    const index = subcategoryData.category.findIndex(el => el._id == categogryId)
    subcategoryData.category.splice(index, 1)
    setsubcategoryData((prev) => {
      return {
        ...prev,

      }
    })

  }
  console.log(subcategoryData)
  return (
    <div className='flex items-center justify-center p-2 bg-neutral-800 bg-opacity-60 fixed top-0 bottom-0 left-0 right-0'>
      <div className='bg-white max-w-4xl w-full p-2 rounded'>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold'>Sub Category</h1>
          <button onClick={close} className='w-fit block ml-auto'>
            <IoClose size={25} />
          </button>
        </div>
        <form action="" onSubmit={handleSubmit} className='my-3 grid gap-3'>
          <div className='grid gap-1'>
            <label id='subCategoryName'>Name</label>
            <input className='outline-none border border-primary-200 rounded p-2 focus-within:border-primary-200' type="text" id='subCategoryName' placeholder='Enter Sub category name' value={subcategoryData.name} name='name' onChange={handleChange} />
          </div>
          <div>
            <p>Image</p>
            <div className='flex flex-col lg:flex-row gap-4 items-center '>
              <div className='border flex items-center justify-center bg-blue-50 h-36 lg:w-36 w-full'>
                {
                  subcategoryData.image ? (
                    <img src={subcategoryData.image} alt="category" className='h-full w-full object-scale-down' />
                  ) : (<p className='text-sm text-neutral-800'>No Image</p>)
                }
              </div>
              <label htmlFor="uploadCategoryImage">
                <div className={`px-2 py-1 rounded ${!subcategoryData.name ? "bg-gray-400" : "bg-primary-200"} cursor-pointer `}>Upload Image</div>
                <input disabled={!subcategoryData.name} id='uploadCategoryImage' onChange={handleUploadImage} type="file" className='hidden' />
              </label>
            </div>
          </div>
          <div className='grid gap-2'>
            <label htmlFor="">Select Category</label>

            <div className='border focus-within:border-primary-200 outline-none '>
              <div className='flex flex-wrap gap-3 m-1 '>

                {subcategoryData.category.map((cat, ind) => {
                  return (

                    <p className="shadow-md flex items-center gap-2 bg-white px-1" key={ind}>{cat.name}
                      <div onClick={() => handleDeleteSelected(cat._id)} className=' cursor-pointer '><IoClose size={18} /></div>
                    </p>


                  )
                })}

              </div>

              <select onChange={(e) => {
                const value = e.target.value
                const selectedCategory = allCategoryData.find(el => el._id === value)
                setsubcategoryData((prev) => {
                  if (!prev.category.some(cat => cat._id === selectedCategory._id)) {
                    return {
                      ...prev,
                      category: [...prev.category, { ...selectedCategory }]
                    }
                  }
                  return prev


                })

              }} className='w-full p-2 bg-transparent'>
                <option value="" >Select Category</option>
                {
                  allCategoryData.map((category, index) => {
                    return (
                      <option value={category?._id} key={category._id}> {category?.name}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>

          <button className={`${subcategoryData.name && subcategoryData.image && subcategoryData.category[0] ? "bg-primary-200" : "bg-gray-400"} py-2 font-semibold `}>Add Sub category</button>
        </form>
      </div>



    </div>
  )
}

export default UploadSubCategory
