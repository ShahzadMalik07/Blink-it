import React, { useEffect, useState } from 'react'
import UploadCategory from '../components/UploadCategory'
import AxiosToastError from '../utils/AxiosToastError'
import axios from 'axios'
import Loading from '../components/Loading'
import NoData from '../components/NoData'

const Category = () => {
  const [openUploadCategory, setopenUploadCategory] = useState(false)
  const [loading, setloading] = useState(true)
  const [categoryData, setcategoryData] = useState([])

  const getCategoryData = async () => {
    setloading(true)
    try {
      const response = await axios.get("http://localhost:3000/api/category/get-category")
      const { data: responseData } = response
      console.log(responseData)
      if (responseData.success) {
        setcategoryData(responseData.data)
        console.log(categoryData)

      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    getCategoryData()
  }, [])

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
              <div className='w-32 h-48 m-1 rounded shadow-md'>
                <img src={cat.Image} alt={cat.name} className='w-full object-scale-down' />
              </div>
            )
          })
        }
      </div>

      {
        loading ? <Loading /> : ""
      }



      {openUploadCategory && <UploadCategory getData={getCategoryData} close={() => setopenUploadCategory(false)} />}

    </div>
  )
}

export default Category
