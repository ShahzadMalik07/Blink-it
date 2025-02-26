import React, { useEffect, useState } from 'react'
import UploadCategory from '../components/UploadCategory'
import AxiosToastError from '../utils/AxiosToastError'
import axios from 'axios'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import UpdateCategory from '../components/UpdateCategory'
import DialogBox from '../components/DialogBox'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const Category = () => {
  const [openUploadCategory, setopenUploadCategory] = useState(false)
  const [loading, setloading] = useState(true)
  const [categoryData, setcategoryData] = useState([])
  const [editOpen, seteditOpen] = useState(false)
  const [dialogOpen, setdialogOpen] = useState(false)
  const [categoryId, setcategoryId] = useState({
    _id: ""
  })
  const [editData, seteditData] = useState({
    name: "",
    Image: ""
  })

  const allCategoryData = useSelector(store => store.product.allCategory)
  useEffect(() => {
    setloading(true)
    setcategoryData(allCategoryData)
    setloading(false)
  }, [allCategoryData])

  const handleDelete = async () => {
    try {
      const response = await axios.delete("http://localhost:3000/api/category/delete", { data: categoryId })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        getCategoryData()
        setdialogOpen(false)

      }


    } catch (error) {
      AxiosToastError(error)

    }

  }



  return (
    <div>
      <div className='flex items-center justify-between p-2 bg-white shadow-md '>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={() => setopenUploadCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
      </div>
      {
        !categoryData[0] && !loading && (
          <NoData />
        )
      }
      <div className='p-3 grid grid-cols-2 lg:grid-cols-6 lg:ml-8'>
        {
          categoryData.map((cat) => {
            return (
              <div className='w-32 h-56 m-1 rounded shadow-md' key={cat._id}>
                <img src={cat.Image} alt={cat.name} className='w-full object-scale-down' />

                <div className='flex gap-2  items-center'>
                  <button onClick={() => {
                    seteditOpen(true)
                    seteditData(cat)
                  }} className='flex-1 py-1 bg-green-100  text-green-600 hover:bg-green-200  rounded'>Edit</button>
                  <button onClick={() => {
                    setdialogOpen(true)
                    setcategoryId(cat)
                  }} className='flex-1 py-1 bg-red-100 text-red-500 hover:bg-red-200 rounded '>Delete</button>
                </div>
              </div>
            )
          })
        }
      </div>

      {
        loading ? <Loading /> : ""
      }



      {openUploadCategory && <UploadCategory getData={getCategoryData} close={() => setopenUploadCategory(false)} />}

      {editOpen && (
        <UpdateCategory close={() => seteditOpen(false)} getData={getCategoryData} categoryData={editData} />
      )}

      {
        dialogOpen && <DialogBox close={() => setdialogOpen(false)} confirm={handleDelete} />
      }

    </div>
  )
}

export default Category
